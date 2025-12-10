import sql from '../../db.js';

export async function getLookingForTags(req, res) {
  try {
    const lookingForTags = await sql`
          SELECT id, name
          FROM looking_for_tags
          ORDER BY name;
        `;
    res.json({ lookingForTags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
