import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

/**
 * Wrap supabase API endpoint in a GET request
 */
export const GET: RequestHandler = async (event) => {
  const supabase = event.locals.supabase;

  const { slug } = event.params;

  const post = await supabase.getBlogPost(slug);

  if ("code" in post) {
    return json(post, {
      status: post.code
    });
  }

  return json(post);
};
