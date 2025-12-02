import { NextResponse } from "next/server";
import { supabase } from '@/utils/supabaseClient';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    if (!query || query.length < 1) {
        return NextResponse.json([]);
    }

    const { data, error } = await supabase
        .from("users") // public.users
        .select("id, name, image_url")
        .ilike("name", `%${query}%`)
        .limit(10);

    if (error) {
        console.error("Search users error:", error);
        return NextResponse.json([], { status: 500 });
    }

    // ✅ FlyonUI forventer typisk dette format:
    const result = data.map((user) => ({
        id: user.id,
        name: user.name,
        image: user.image_url,
        position: "Users", // bruges til grouping
    }));

    return NextResponse.json(result);
}