import type { PageLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { l } from "$lib/i18n";

export const load: PageLoad = async ({ parent }) => {
  const { supabase, session } = await parent();
  const _l: (page: "login") => string = await new Promise((resolve) => {
    const u = l.subscribe((value) => {
      resolve(value);
      u();
    });
  });
  if (!session) {
    throw redirect(303, _l("login"));
  }
  const blogPosts = await supabase.getBlogPosts();
  console.log(blogPosts);
  if ("code" in blogPosts) throw error(blogPosts.code, blogPosts.message);

  return {
    user: session.user,
    blogPosts
  };
};
