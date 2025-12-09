import sql from '../../db.js';

export async function getStories(req, res) {
  try {
    const result = await sql`
      SELECT id, name, image_url
      FROM users
      ORDER BY created_at DESC;
    `;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
}
