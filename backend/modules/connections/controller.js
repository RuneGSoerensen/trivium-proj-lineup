import sql from "../../db.js";
export const follow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    await sql`
      INSERT INTO connections (follower_id, following_id)
      VALUES (${follower_id}, ${following_id})
      ON CONFLICT DO NOTHING;
    `;

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to follow" });
  }
};

export const unfollow = async (req, res) => {
  const { follower_id, following_id } = req.body;

  try {
    await sql`
      DELETE FROM connections
      WHERE follower_id = ${follower_id}
      AND following_id = ${following_id};
    `;

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to unfollow" });
  }
};

export const getStats = async (req, res) => {
  const { id } = req.params;

  const [[followers], [following]] = await Promise.all([
    sql`SELECT COUNT(*) AS followers_count FROM connections WHERE following_id = ${id}`,
    sql`SELECT COUNT(*) AS following_count FROM connections WHERE follower_id = ${id}`,
  ]);

  res.json({
    followers_count: followers.followers_count,
    following_count: following.following_count,
  });
};

export const checkFollowing = async (req, res) => {
  const { followerId, profileId } = req.params;

  const [row] = await sql`
    SELECT * FROM connections
    WHERE follower_id = ${followerId} AND following_id = ${profileId}
  `;

  res.json({ is_following: !!row });
};
