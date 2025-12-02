import sql from "../../db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    if (!query || query.length < 1) {
        return new Response(JSON.stringify([]), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    }

    try {
        const result = await sql`
            SELECT id, name, image_url
            FROM users
            WHERE name ILIKE ${'%' + query + '%'}
            OR email ILIKE ${'%' + query + '%'}
            LIMIT 10;`

        const mapped = result.rows.map((user) => ({
            id: user.id,
            name: user.name,
            imageUrl: user.image_url,
            position: "Users" || "Admins" || "Members", // ???
        }));

        return new Response(JSON.stringify(mapped), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error searching users:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }

}