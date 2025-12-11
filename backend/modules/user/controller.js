import sql from '../../db.js';

export const createUser = async (req, res) => {
  const { id, email, name, birthdate, city, phone_number, is_musician, looking_for, business } =
    req.body;

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
        business
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
        ${business}
      )
      RETURNING *;
    `;

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
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
        'facebook', s.facebook,
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
//needs refactoring at some point, this is not optimal ;)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, bio, about, image_url, theme, genres, looking_for_tags, socials, questions } =
    req.body;

  try {
    // update core fields
    await sql`
      UPDATE users SET
        name = ${name},
        bio = ${bio},
        about = ${about},
        image_url = ${image_url},
        theme = ${theme}
      WHERE id = ${id};
    `;

    // socials (upsert)
    if (socials) {
      await sql`
        INSERT INTO socials (user_id, instagram, x, tiktok, facebook, youtube)
        VALUES (${id}, ${socials.instagram}, ${socials.x}, ${socials.tiktok}, ${socials.facebook}, ${socials.youtube})
        ON CONFLICT (user_id)
        DO UPDATE SET
          instagram = ${socials.instagram},
          x = ${socials.x},
          tiktok = ${socials.tiktok},
          facebook = ${socials.facebook},
          youtube = ${socials.youtube};
      `;
    }

    // genres
    if (genres) {
      // Remove existing relations
      await sql`DELETE FROM user_genres WHERE user_id = ${id}`;

      for (const g of genres) {
        // Try to find the genre
        let [genre] = await sql`SELECT id FROM genres WHERE name = ${g}`;

        // If genre doesn't exist, create it
        if (!genre) {
          [genre] = await sql`
        INSERT INTO genres (name)
        VALUES (${g})
        RETURNING id
      `;
        }

        // Create the user-genre relation
        await sql`
      INSERT INTO user_genres (user_id, genre_id)
      VALUES (${id}, ${genre.id})
    `;
      }
    }

    // looking for tags
    if (looking_for_tags) {
      await sql`DELETE FROM looking_for WHERE user_id = ${id}`;
      for (const tag of looking_for_tags) {
        const [foundTag] = await sql`
          SELECT id FROM looking_for_tags WHERE name = ${tag}
        `;
        if (foundTag) {
          await sql`
            INSERT INTO looking_for (user_id, tag_id)
            VALUES (${id}, ${foundTag.id});
          `;
        }
      }
    }

    // questions
    if (questions) {
      // Remove all existing answers for this user
      await sql`DELETE FROM user_questions WHERE user_id = ${id}`;

      for (const q of questions) {
        // Find existing question
        let [question] = await sql`
      SELECT id FROM questions WHERE question = ${q.question}
    `;

        // If question does not exist, insert it
        if (!question) {
          [question] = await sql`
        INSERT INTO questions (question)
        VALUES (${q.question})
        RETURNING id
      `;
        }

        // Insert user answer
        await sql`
      INSERT INTO user_questions (user_id, question_id, answer)
      VALUES (${id}, ${question.id}, ${q.answer})
    `;
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const addQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    // Find existing question or create new one
    let [existingQuestion] = await sql`
      SELECT id FROM questions WHERE question = ${question}
    `;

    if (!existingQuestion) {
      [existingQuestion] = await sql`
        INSERT INTO questions (question)
        VALUES (${question})
        RETURNING id
      `;
    }

    // Insert user answer (with blank answer if not provided)
    await sql`
      INSERT INTO user_questions (user_id, question_id, answer)
      VALUES (${id}, ${existingQuestion.id}, ${answer || ''})
    `;

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to add question' });
  }
};
