import type { BlogPost, DbError } from "@curarehab/api";
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

export const POST: RequestHandler = async (event) => {
  function isBlogPost(data: unknown): data is Pick<BlogPost, "id" | "post"> {
    if (typeof data !== "object") return false;
    if (data === null) return false;
    if ("id" in data && typeof data.id !== "string") return false;
    if ("post" in data && typeof data.post !== "string") return false;
    return true;
  }

  const supabase = event.locals.supabase;

  const data: unknown = await event.request.json();

  if (isBlogPost(data)) {
    const res = await supabase.s
      .from("blog")
      .update({
        post: data.post,
        updated_at: new Date().toISOString()
      })
      .eq("id", data.id);
    if (res.error) {
      return json({ code: 500, message: res.error.message } satisfies DbError);
    } else {
      return json({ success: true });
    }
  }
  return json({ code: 404, message: "Resource not found" });
};
