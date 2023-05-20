import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const session = await event.locals.getSession();

  const posts = await supabase.getTerapheutMetaData(session === null);

  if ("code" in posts) {
    return json(posts, { status: posts.code });
  }

  return json(posts);
};
