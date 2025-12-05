import sql from '../../db.js';
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
    return res.status(400).json({ error: result.error.issues });
  }

  const { title, description, paid_opportunity, image_url, location, people_user_ids, genres } =
    result.data;

  // Make sure all user IDs exist before creating any table rows.
  for (const userId of people_user_ids) {
    const [{ exists }] = await sql`
      SELECT EXISTS(SELECT id FROM users WHERE id = ${userId})
    `;
    if (!exists) {
      return res.status(400).json({ error: `User with ID ${userId} does not exist.` });
    }
  }

  await sql.begin(async (sql) => {
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
          user_id: userId,
        }))
      )};
    `;

    // Bulk insert genres and link them to the request
    if (genres.length > 0) {
      // Insert any missing genres (ignore duplicates)
      await sql`
        INSERT INTO genres (name)
        VALUES ${sql(genres.map((name) => [name]))}
        ON CONFLICT (name) DO NOTHING
      `;

      // Fetch all genre IDs for the given names
      const genreRows = await sql`
        SELECT id, name FROM genres
        WHERE name IN ${sql(genres)}
      `;

      // Prepare bulk insert for requests_genres
      await sql`
        INSERT INTO requests_genres (request_id, genre_id)
        VALUES ${sql(genreRows.map((row) => [newRequestId, row.id]))}
      `;
    }
  });

  res.sendStatus(201);
}

export async function getAllRequests(req, res) {
  const offset = parseInt(req.query.offset) || 0;
  const requests = await sql`
SELECT 
    req.*,

    -- Creator of the request
    json_build_object(
        'id', u.id,
        'name', u.name,
        'image_url', u.image_url
    ) AS created_by,

    -- Genres attached to request
    (
        SELECT json_agg(
            json_build_object(
                'id', g.id,
                'name', g.name
            )
        )
        FROM requests_genres rg
        JOIN genres g ON g.id = rg.genre_id
        WHERE rg.request_id = req.id
    ) AS genres,

    -- Tagged people on request
    (
        SELECT json_agg(
            json_build_object(
                'id', tu.id,
                'name', tu.name,
                'image_url', tu.image_url
            )
        )
        FROM requests_tagged_people rtp
        JOIN users tu ON tu.id = rtp.user_id
        WHERE rtp.request_id = req.id
    ) AS tagged_people

FROM requests req
JOIN users u ON u.id = req.user_id
ORDER BY req.created_at DESC
LIMIT 5 
OFFSET ${offset};

  `;
  res.status(200).json(requests);
}
