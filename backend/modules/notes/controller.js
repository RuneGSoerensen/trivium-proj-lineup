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
          'content', c.content,
          'created_at', c.created_at,
          'user', jsonb_build_object(
            'id', cu.id,
            'name', cu.name,
            'image_url', cu.image_url
          )
        )
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
  const { user_id, note_id, content } = req.body;

  try {
    await sql`
      INSERT INTO comments (note_id, user_id, content)
      VALUES (${note_id}, ${user_id}, ${content});
    `;

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to comment" });
  }
};
