import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { supabase, session } = await event.parent();

  const posts = await supabase.getBlogPostsMetaData();
  if ("code" in posts) throw error(posts.code, posts.message);
  // TODO: Check if author is valid, if locale is valid and if post is published

  return {
    ...(session?.user && { user: session.user }),
    posts
  };
};
