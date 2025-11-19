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
