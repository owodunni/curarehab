import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const session = await event.locals.getSession();

  const posts = await supabase.getBlogPostsMetaData(session === null);

  if ("code" in posts) {
    return new Response(JSON.stringify(posts), {
      status: posts.code,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(posts), { headers: { "content-type": "application/json" } });
};
