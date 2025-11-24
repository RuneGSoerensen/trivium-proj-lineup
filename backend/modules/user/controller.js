import sql from "../../db.js";

export const createUser = async (req, res) => {
  const {
    id,
    email,
    name,
    birthdate,
    city,
    phone_number,
    is_musician,
    looking_for,
    business,
  } = req.body;

  try {
    const [user] = await sql`
      INSERT INTO users (
        id, 
        email,
        name,
        birthdate,
        city,
        phone_number,
        is_musician,
        looking_for,
        business,
      )
      VALUES (
        ${id},
        ${email},
        ${name},
        ${birthdate},
        ${city},
        ${phone_number},
        ${is_musician},
        ${looking_for},
        ${business},
      )
      RETURNING *;
    `;

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await sql`
  SELECT 
    u.id,
    u.name,
    u.business,
    u.bio,
    u.about,
    u.theme,
    u.image_url,

    (SELECT jsonb_agg(jsonb_build_object(
        'spotify', s.spotify,
        'instagram', s.instagram,
        'x', s.x,
        'youtube', s.youtube,
        'tiktok', s.tiktok
    ))
     FROM socials s
     WHERE s.user_id = u.id
    ) AS socials,

    json_agg(DISTINCT g.name) AS genres,

    json_agg(DISTINCT lft.name) AS looking_for_tags,

    json_agg(DISTINCT jsonb_build_object('question', q.question, 'answer', uq.answer)) AS questions

FROM users u
LEFT JOIN user_genres ug ON ug.user_id = u.id
LEFT JOIN genres g ON g.id = ug.genre_id
LEFT JOIN looking_for lf ON lf.user_id = u.id
LEFT JOIN looking_for_tags lft ON lft.id = lf.tag_id
LEFT JOIN user_questions uq ON uq.user_id = u.id
LEFT JOIN questions q ON q.id = uq.question_id

WHERE u.id = ${id}
GROUP BY u.id;
    `;
    return res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
