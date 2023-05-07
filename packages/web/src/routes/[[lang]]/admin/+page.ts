import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { link } from "$lib/i18n";
import type { BlogPostMetaData } from "@curarehab/api";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { session } = await parent();
  if (!session) {
    throw redirect(303, await link("login"));
  }
  const blogPosts = await fetch("/api/artiklar");

  return {
    user: session.user,
    blogPosts: (await blogPosts.json()) as BlogPostMetaData[]
  };
};
