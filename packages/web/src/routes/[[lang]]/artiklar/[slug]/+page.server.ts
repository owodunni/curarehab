import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const post = data.get("post");
    const id = data.get("post_id");

    if (!post || !id) {
      return fail(400, { post, id, missing: true });
    }

    const res = await event.locals.supabase.s
      .from("blog")
      .update({
        post: post.toString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (res.error) {
      return fail(400, { post, id, incorrect: true, error: res.error });
    }
    return { post, id };
  }
} satisfies Actions;
