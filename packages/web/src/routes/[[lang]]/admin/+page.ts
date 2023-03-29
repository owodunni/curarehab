import type { PageLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { link } from "$lib/i18n";

export const load: PageLoad = async ({ parent }) => {
  const { supabase, session } = await parent();
  if (!session) {
    throw redirect(303, await link("login"));
  }
  const blogPosts = await supabase.getBlogPosts();
  if ("code" in blogPosts) throw error(blogPosts.code, blogPosts.message);

  return {
    user: session.user,
    blogPosts: await Promise.all(
      blogPosts.map(async (post) => ({
        ...post,
        link: `${await supabase.util().getRouteToPost(post)}`
      }))
    )
  };
};
