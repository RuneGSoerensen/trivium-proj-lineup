import sql from "../../db.js";
import z from 'zod';

export const getUserNotes = async (req, res) => {
  const { id } = req.params;

  const notes = await sql`
    SELECT 
      n.*,
      u.name AS user_name,
      u.image_url AS user_image,
      (
        SELECT json_agg(tag.name ORDER BY tag.name)
        FROM note_tagged nt
        JOIN note_tags tag ON tag.id = nt.tag_id
        WHERE nt.note_id = n.id
    ) AS tags,
      (SELECT COUNT(*) FROM note_likes WHERE note_id = n.id) AS likes_count,
      (SELECT COUNT(*) FROM comments WHERE note_id = n.id) AS comments_count,
      (SELECT json_agg(
        jsonb_build_object(
          'id', c.id,
          'parent_comment_id', c.parent_comment_id,
          'content', c.content,
          'created_at', c.created_at,
          'likes_count', (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = c.id),
          'user', jsonb_build_object(
            'id', cu.id,
            'name', cu.name,
            'image_url', cu.image_url
          )
        ) ORDER BY c.created_at ASC
      )
       FROM comments c
       JOIN users cu ON cu.id = c.user_id
       WHERE c.note_id = n.id
      ) AS comments
    FROM notes n
    JOIN users u ON u.id = n.user_id
    WHERE n.user_id = ${id}
    ORDER BY n.created_at DESC
  `;

  res.json(notes);
};

export const likeNote = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    await sql`
      INSERT INTO note_likes (note_id, user_id)
      VALUES (${id}, ${user_id})
      ON CONFLICT (note_id, user_id)
      DO NOTHING;
    `;

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to like" });
  }
};

export const commentNote = async (req, res) => {
  const { user_id, note_id, content, parent_comment_id = null } = req.body;

  try {
    await sql`
      INSERT INTO comments (note_id, user_id, content, parent_comment_id)
      VALUES (${note_id}, ${user_id}, ${content}, ${parent_comment_id});
    `;

    res.json({ success: true });
  } catch (err) {
    console.error("commentNote error", err);
    res.status(500).json({ error: "Failed to comment" });
  }
};

export const likeComment = async (req, res) => {
  const { id } = req.params; // comment id
  const { user_id } = req.body;

  try {
    // Check if user already liked this comment
    const existing = await sql`
      SELECT COUNT(*)::int AS count
      FROM comment_likes
      WHERE comment_id = ${id} AND user_id = ${user_id}
    `;

    const alreadyLiked = existing[0]?.count > 0;

    if (alreadyLiked) {
      // remove like
      await sql`
        DELETE FROM comment_likes WHERE comment_id = ${id} AND user_id = ${user_id}
      `;
    } else {
      // add like
      await sql`
        INSERT INTO comment_likes (comment_id, user_id)
        VALUES (${id}, ${user_id})
        ON CONFLICT (comment_id, user_id) DO NOTHING
      `;
    }

    const [{ count: likes_count }] = await sql`
      SELECT COUNT(*)::int AS count FROM comment_likes WHERE comment_id = ${id}
    `;

    res.json({ success: true, likes_count, is_liked: !alreadyLiked });
  } catch (err) {
    console.error("likeComment error", err);
    res.status(500).json({ error: "Failed to toggle comment like" });
  }
};

export async function createNote(req, res) {
  const userId = req.userId;

  const schema = z.object({
    title: z.string(),
    content: z.string(),
    image_url: z.url().default(null),
    people_user_ids: z.array(z.uuid()).default([]),
    tags: z.array(z.string()).default([]),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(
      { error: result.error.issues }
    );
  }

  const {
    title,
    content,
    image_url,
    people_user_ids,
    tags,
  } = result.data;

  await sql.begin(async sql => {
    // insert note row
    const [{ id: newNoteId }] = await sql`
      INSERT INTO notes
        (
          user_id,
          title,
          content,
          image_url
        )
      VALUES
        (
          ${userId},
          ${title},
          ${content},
          ${image_url}
        )
      RETURNING notes.id;
  `;

    // insert the people links
    // claude says:
    // "When you pass an array of objects to sql(), postgres.js automatically:
    // 1. Extracts the column names from the object keys
    // 2. Generates the proper INSERT statement
    // 3. Safely parameterizes all the values"
    await sql`
      INSERT INTO notes_tagged_people ${sql(
      people_user_ids.map((userId) => ({
        note_id: newNoteId,
        user_id: userId
      }))
    )}
    `;

    // insert the tag links, creating any missing tags
    for (const tagName of tags) {
      // Check if tag already exists
      const [existingTag] = await sql`
        SELECT id FROM note_tags
        WHERE name = ${tagName}
        LIMIT 1
    `;

      const existingTagId = existingTag?.id;

      if (existingTagId) {
        // Existing tag found, use it
        await sql`
          INSERT INTO note_tagged
          (note_id, tag_id)
          VALUES
          (${newNoteId}, ${existingTagId});
        `;
      } else {
        // Not found, create new first
        const [{ id: newTagId }] = await sql`
          INSERT INTO note_tags
          (name)
          VALUES
          (${tagName})
          RETURNING id;
        `;

        console.log('NEW TAG ID');
        console.log(newTagId);

        // ..then use it
        await sql`
          INSERT INTO note_tagged
          (note_id, tag_id)
          VALUES
          (${newNoteId}, ${newTagId});
        `;
      }
    }
  });

  res.sendStatus(201);
}
