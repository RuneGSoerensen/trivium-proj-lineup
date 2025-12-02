import { sql } from "../../database/database.js";

/**
 * GET /threads
 * Gets threads for the authenticated user
 */
export const getThreads = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;

        if (!userId) {
            return res.status(401).json({ error: "Missing user id" });
        }

        const threads = await sql`
        SELECT
            id,
            is_group,
            title,
            participant_id,
            participant_name,
            participant_avatar_url,
            participant_names,
            last_message_preview,
            last_message_at
        from chat_threads_overview
        where participant_id = ${userId}
        order by last_message_at desc nulls last, id desc;
        `;

        const result = threads.map((row) => ({
            id: row.id,
            isGroup: row.is_group,
            title: row.title,
            participantId: row.participant_id,
            participantName: row.participant_name,
            participantAvatarUrl: row.participant_avatar_url,
            participantNames: row.participant_names,
            lastMessagePreview: row.last_message_preview,
            lastMessageAt: row.last_message_at,
        }));

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
    //TODO Implementation here
};

/**
 * GET /threads/:threadId/messages
 * Gets all messages for a specific thread
 */
export const getThreadMessages = async (req, res) => {
    const { threadId } = req.params;
    // get real userId from auth middleware
    const userId = req.user?.id || req.query.userId;

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
            messages: messages.map((m) => ({
                id: m.id,
                threadId: m.thread_id,
                authorId: m.author_id,
                role: m.role, // "user" | "assistant" | "system"
                content: m.content,
                createdAt: m.created_at,
                authorName: m.author_name,
                authorAvatarUrl: m.author_avatar_url,
            }))
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
    const userId = req.user?.id || req.body.userId;

    if (!content?.trim()) {
        return res.status(400).json({ error: "Message content cannot be empty" });
    }

    try {
        // check user is in the thread
        const [participant] = await sql`
        select 1 
        from chats_participants
        where thread_id = ${threadId}
        and user_id = ${userId};
        limit 1;
        `;

        if (!participant) {
            return res.status(403).json({ error: "Access denied to this thread" });
        }

        const [message] = await sql`
        insert into chats_messages (thread_id, author_id, role, content)
        values (${threadId}, ${userId}, 'user', ${content})
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
