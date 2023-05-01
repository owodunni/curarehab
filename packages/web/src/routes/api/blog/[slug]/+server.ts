import type { RequestHandler } from "./$types";

/**
 * Wrap supabase API endpoint in a GET request
 */
export const GET: RequestHandler = async (event) => {
  console.log("GET", event);

  const supabase = event.locals.supabase;

  const { slug } = event.params;

  const post = await supabase.getBlogPost(slug);

  if ("code" in post) {
    return new Response(JSON.stringify(post), {
      status: post.code,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(post), { headers: { "content-type": "application/json" } });
};
