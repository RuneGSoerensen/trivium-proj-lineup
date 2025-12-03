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

  console.log(result.data);

  const {
    title,
    description,
    paid_opportunity,
    image_url,
    location,
    people_user_ids,
    genres,
  } = result.data;

}
