import sql from "../../db.js";

export const search = async (req, res) => { 
    const query = (req.query.query || "").trim();

    // If query is empty, return empty array
    if (!query) {
        return res.status(200).json([]);
    }

    try {
        // Simple search in users table by name or email
        const result = await sql`
            SELECT id, name, image_url, role
            FROM users
            WHERE name ILIKE ${'%' + query + '%'}
            OR email ILIKE ${'%' + query + '%'}
            LIMIT 10;
        `;

        // Map DB rows into desired response format
        const mapped = result.rows.map((user) => ({
            id: user.id,
            name: user.name,
            imageUrl: user.image_url,
            position: user.role, // can be null if unused
        }));

        return res.status(200).json(mapped);
    } catch (error) {
        console.error("Error while searching:", error);
        return res.status(500).json({ error: "Something went wrong while searching" });
    }
}

