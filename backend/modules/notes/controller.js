import sql from "../../db.js";

export const getUserNotes = async (req, res) => {
  const { id } = req.params;

  const notes = await sql`
    SELECT 
      n.*,
      u.name AS user_name,
      u.image_url AS user_image,
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
