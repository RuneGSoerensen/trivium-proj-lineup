import sql from "../../db.js";
import z from 'zod';

export async function createRequest(req, res) {
  const userId = req.userId;

  const schema = z.object({
    title: z.string(),
    description: z.string(),
    paid_opportunity: z.boolean(),
    image_url: z.url().default(null),
    location: z.string().default(null),
    people_user_ids: z.array(z.uuid()).default([]),
    genres: z.array(z.string()).default([]),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(
      { error: result.error.issues }
    );
  }

  const {
    title,
    description,
    paid_opportunity,
    image_url,
    location,
    people_user_ids,
    genres,
  } = result.data;

  // Make sure all user IDs exist before creating any table rows.
  for (const userId of people_user_ids) {
    const [{ exists }] = await sql`
      SELECT EXISTS(SELECT id FROM users WHERE id = ${userId})
    `;
    if (!exists) {
      return res.status(400).json(
        { error: `User with ID ${userId} does not exist.` }
      );
    }
  }

  await sql.begin(async sql => {
    const [{ id: newRequestId }] = await sql`
      INSERT INTO requests
        (
          user_id,
          title,
          description,
          paid_opportunity,
          image_url,
          location
        )
      VALUES
        (
          ${userId},
          ${title},
          ${description},
          ${paid_opportunity},
          ${image_url},
          ${location}
        )
      RETURNING requests.id;
  `;

    // insert the tagged people
    await sql`
      INSERT INTO requests_tagged_people ${sql(
      people_user_ids.map((userId) => ({
        request_id: newRequestId,
        user_id: userId
      }))
    )};
    `;

    // insert the genre links, creating any missing tags
    for (const genreName of genres) {
      // Check if genre already exists
      const [existingGenre] = await sql`
        SELECT id FROM genres
        WHERE name = ${genreName}
        LIMIT 1
    `;

      const existingGenreId = existingGenre?.id;

      if (existingGenreId) {
        // Existing genre found, use it
        await sql`
          INSERT INTO requests_genres
          (request_id, genre_id)
          VALUES
          (${newRequestId}, ${existingGenreId});
        `;
      } else {
        // Not found, create new first
        const [{ id: newGenreId }] = await sql`
          INSERT INTO genres
          (name)
          VALUES
          (${genreName})
          RETURNING id;
        `;

        // ..then use it
        await sql`
          INSERT INTO requests_genres
          (request_id, genre_id)
          VALUES
          (${newRequestId}, ${newGenreId});
        `;
      }
    }
  });

  res.sendStatus(201);
}
