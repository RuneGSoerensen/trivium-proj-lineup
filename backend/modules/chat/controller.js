import sql from "../../db.js";
import { randomUUID } from "crypto";

/**
 * GET /threads
 * Gets threads for the authenticated user
 */
export const getThreads = async (req, res) => {
    try {
        const userId = req.user?.id || req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Missing user id" });
        }

        const threads = await sql`
        select
            t.id,
            t.is_group,
            t.title,
            
            -- last message preview and timestamp
            last_msg.content as last_message_preview,
            last_msg.created_at as last_message_at,
            
            -- "other participant" info for 1:1 chats (may be null for groups)
            other_user.id as other_id,
            other_user.name as other_name,
            other_user.image_url as other_avatar_url,
            
            -- aggregated participant names for group chats / fallback
            all_names.participant_names,
            stats.other_participant_count
            from chats t

            -- ensure current user is a participant
            join chats_participants me
            on me.thread_id = t.id
            and me.user_id = ${userId}

            -- latest message per thread
             left join lateral (
             select m.content, m.created_at
             from chats_messages m
             where m.thread_id = t.id
             order by m.created_at desc, m.id desc
             limit 1
            ) as last_msg on true

            -- get "other" participant for 1:1 chats (first non-me user)
            left join lateral (
              select u.id, u.name, u.image_url
              from chats_participants cp
              join users u on u.id = cp.user_id
              where cp.thread_id = t.id
              and cp.user_id <> ${userId}
              order by u.name
              limit 1
            ) as other_user on true

            -- all participant forenames for group chats as comma-separated string
            left join lateral (
              select string_agg(split_part(u2.name, ' ', 1), ', ' order by u2.name)
              as participant_names
              from chats_participants cp2
              join users u2 on u2.id = cp2.user_id
              where cp2.thread_id = t.id
            ) as all_names on true

            -- count how many *other* participants (excluding current user) are in this thread
            left join lateral (
              select count(*)::int as other_participant_count
              from chats_participants cp3
              where cp3.thread_id = t.id
              and cp3.user_id <> ${userId}
            ) as stats on true

            order by last_msg.created_at desc nulls last, t.id desc;
        `;

        const result = threads.map((row) => {
            const otherCount = row.other_participant_count ?? 0;
            return {
                id: row.id,
                // A "group" is defined as having at least 2 other participants besides the current user
                isGroup: otherCount >= 2,
                title: row.title,
                otherParticipantCount: otherCount,
                // For 1:1 chats we use the "other" user as display participant
                participantId: row.other_id,
                participantName: row.other_name,
                participantAvatarUrl: row.other_avatar_url,
                // For group chats we use the aggregated forenames string
                participantNames: row.participant_names,
                lastMessagePreview: row.last_message_preview,
                lastMessageAt: row.last_message_at,
            };
        });

        return res.json({ threads: result });
    } catch (error) {
        console.error("getThreads error", error);
        return res.status(500).json({ error: "Failed to fetch threads" });
    }
}
/**
 * POST /threads
 * Create new chat group or 1:1 chat
 */
export const createThread = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Missing user id" });
    }

    const {
        isGroup,
        title,
        participantId, // 1:1 chat
        participantIds // groupchat
    } = req.body;

    const isGroupBool = Boolean(isGroup);
    let targetParticipantIds;

    if (isGroupBool) {
        // Groupchat: must have at least 2 participants (excluding self); current user is included as a participant
        if (!Array.isArray(participantIds) || participantIds.length === 0) {
            return res.status(400).json({ error: "Group chat must have at least 2 participants" });
        }
        targetParticipantIds = participantIds;
    } else {
        // 1:1 chats: must have exactly 1 participant + self, check if chat already exists
        if (!participantId) {
            return res.status(400).json({ error: "1:1 chat must have exactly 1 participant" });
        }
        targetParticipantIds = [participantId];
    }

    const allParticipantIds = Array.from(
        new Set([userId, ...targetParticipantIds].filter((id) => id && id !== ""))
    );

    if (allParticipantIds.length < 2) {
        return res.status(400).json({ error: "A chat must have at least 2 participants" });
    }

    const threadId = randomUUID();

    try {
        //create chat thread
        const [thread] = await sql`
        insert into chats (id, is_group, title, created_by)
        values(${threadId}, ${isGroupBool}, ${title || null}, ${userId})
        returning id, is_group, title, created_at, created_by;
        `;

        // add participants
        await Promise.all(
            allParticipantIds.map((pid) => sql`
            insert into chats_participants (thread_id, user_id, role)
            values (${threadId}, ${pid}, ${pid === userId ? 'admin' : 'member'});
        `)
        );

        // send response to frontend
        return res.status(201).json({
            thread: {
                id: thread.id,
                isGroup: thread.is_group,
                title: thread.title,
                createdAt: thread.created_at,
                createdBy: thread.created_by,
                lastMessageAt: thread.last_message_at || null,
                lastMessagePreview: thread.last_message_preview || null,
            }
        });
    } catch (error) {
        console.error("createThread error", error);
        return res.status(500).json({ error: "Failed to create thread" });
    }
}

/**
 * GET /threads/:threadId/messages
 * Gets all messages for a specific thread
 */
export const getThreadMessages = async (req, res) => {
    const { threadId } = req.params;
    // get real userId from auth middleware
    const userId = req.user?.id;

    if (!threadId) {
        return res.status(400).json({ error: "Missing thread id" });
    }

    try {
        // check if user is participant in the thread
        const [participant] = await sql`
        select 1 
        from chats_participants
        where thread_id = ${threadId}
        and user_id = ${userId}
        limit 1;
        `;

        if (!participant) {
            return res.status(403).json({ error: "Access denied to this thread" });
        }

        const messages = await sql`
        select
            m.id,
            m.thread_id,
            m.author_id,
            m.role,
            m.content,
            m.created_at,
            u.name as author_name,
            u.image_url as author_avatar_url
            from chats_messages m
        join users u on u.id = m.author_id
        where m.thread_id = ${threadId}
        order by m.created_at asc, m.id asc;
        `;

        return res.json({
            messages: messages.map((m) => {
                const isMine = m.author_id === userId;
                const effectiveRole = isMine ? 'user' : 'other';
                return {
                    id: m.id,
                    threadId: m.thread_id,
                    authorId: m.author_id,
                    role: effectiveRole, 
                    content: m.content,
                    createdAt: m.created_at,
                    authorName: m.author_name,
                    authorAvatarUrl: m.author_avatar_url,
                };
            })
        })
    } catch (error) {
        console.error("getThreadMessages error", error);
        return res.status(500).json({ error: "Failed to fetch messages" });
    }
}

/**
 * POST /threads/:threadId/messages
 * Body: { content: string }
 */
export const createMessage = async (req, res) => {
    const { threadId } = req.params;
    const { content } = req.body;
    // get real userId from auth middleware
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: "Missing user id" });
    }

    if (!content?.trim()) {
        return res.status(400).json({ error: "Message content cannot be empty" });
    }

    try {
        // check user is in the thread
        const [participant] = await sql`
        select 1 
        from chats_participants
        where thread_id = ${threadId}
        and user_id = ${userId}
        limit 1;
        `;

        if (!participant) {
            return res.status(403).json({ error: "Access denied to this thread" });
        }

        const [message] = await sql`
        insert into chats_messages (thread_id, author_id, role, content, created_at)
        values (${threadId}, ${userId}, 'user', ${content}, now())
        returning 
        id,
        thread_id,
        author_id,
        content,
        role,
        created_at;
        `;

        return res.status(201).json({
            message: {
                id: message.id,
                threadId: message.thread_id,
                authorId: message.author_id,
                content: message.content,
                role: message.role,
                createdAt: message.created_at,
            }
        });

    } catch (error) {
        console.error("createMessage error", error);
        return res.status(500).json({ error: "Failed to create message" });
    }
}
