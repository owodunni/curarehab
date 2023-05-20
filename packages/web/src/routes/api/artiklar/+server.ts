import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const session = await event.locals.getSession();

  const limit = event.url.searchParams.get("limit");

  const posts = await supabase.getBlogPostsMetaData(
    session === null,
    limit ? parseInt(limit) : undefined
  );

  if ("code" in posts) {
    return json(posts, { status: posts.code });
  }

  return json(posts);
};
