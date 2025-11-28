import sql from "../../db.js";
export async function getGenres(req, res) {
  try {
    const genres = await sql`
          SELECT id, name
          FROM genres
          ORDER BY name;
        `;
    res.json({ genres });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
