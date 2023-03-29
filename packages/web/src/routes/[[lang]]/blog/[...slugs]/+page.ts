import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { marked } from "marked";

export const load: PageLoad = async (event) => {
  const { supabase } = await event.parent();

  const post = await supabase.util().getPostFromRoute(event.params.slugs);
  // TODO: Check if author is valid, if locale is valid and if post is published

  if ("code" in post) throw error(post.code, post.message);
  return {
    post: { ...post, html: marked.parse(post.post || "") }
  };
};