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
