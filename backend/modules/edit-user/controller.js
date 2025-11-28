import sql from "../../db.js";

export const editUser = async (req, res) => {
  const { name, bio, about, theme } = req.body;
  const userId = req.params.id;

  try {
    const [updatedUser] = await sql`
    UPDATE users
    SET name = ${name}, bio = ${bio}, about = ${about}, theme = ${theme}
    WHERE id = ${userId}
    RETURNING *;
  `;

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const editGenres = async (req, res) => {
  const { genres } = req.body; // expected: array of genre names (strings)
  const userId = req.params.id;

  if (!Array.isArray(genres)) {
    return res.status(400).json({ error: "genres must be an array" });
  }

  try {
    await sql.begin(async (tx) => {
      // Resolve incoming genre names to genre IDs. Only names (strings) are allowed.
      const resolvedIds = [];

      for (const g of genres) {
        if (typeof g !== "string") {
          throw {
            status: 400,
            message: `Invalid genre value (only names allowed): ${JSON.stringify(
              g
            )}`,
          };
        }

        const name = g.trim();
        if (!name) {
          throw { status: 400, message: `Genre name cannot be empty` };
        }

        // find by name (case-sensitive). If not found, create it and let DB assign id.
        const existing = await tx`SELECT id FROM genres WHERE name = ${name}`;
        if (existing.length) {
          resolvedIds.push(existing[0].id);
        } else {
          const [inserted] =
            await tx`INSERT INTO genres (name) VALUES (${name}) RETURNING id`;
          resolvedIds.push(inserted.id);
        }
      }

      // Get current genre ids for the user
      const currentRows =
        await tx`SELECT genre_id FROM user_genres WHERE user_id = ${userId}`;
      const currentIds = currentRows.map((r) => r.genre_id);

      const newSet = new Set(resolvedIds);
      const currSet = new Set(currentIds);

      const toAdd = [...newSet].filter((x) => !currSet.has(x));
      const toRemove = [...currSet].filter((x) => !newSet.has(x));

      // Delete removed relations
      if (toRemove.length) {
        await tx`
          DELETE FROM user_genres
          WHERE user_id = ${userId}
          AND genre_id = ANY(${toRemove});
        `;
      }

      // Insert new relations
      for (const gid of toAdd) {
        await tx`INSERT INTO user_genres (user_id, genre_id) VALUES (${userId}, ${gid})`;
      }
    });

    res.json({ message: "Genres updated successfully" });
  } catch (error) {
    if (error && error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    console.error("Error updating genres:", error);
    res.status(500).json({ error: "Failed to update genres" });
  }
};
