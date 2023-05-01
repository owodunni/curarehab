import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const posts = await supabase.getBlogPostsMetaData();

  if ("code" in posts) {
    return new Response(JSON.stringify(posts), {
      status: posts.code,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(posts), { headers: { "content-type": "application/json" } });
};
