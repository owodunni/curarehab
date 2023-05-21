import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { BlogPostMetaData, Terapheut } from "@curarehab/api";

export const load: PageLoad = async ({ parent, fetch }) => {
  const { session, l } = await parent();
  if (!session) {
    throw redirect(303, l("login"));
  }
  const blogPosts = await fetch("/api/artiklar");
  const terapeut = await fetch(`/api/terapeuter/${session.user.id}`);

  return {
    user: session.user,
    terapeut: (await terapeut.json()) as Terapheut,
    blogPosts: (await blogPosts.json()) as BlogPostMetaData[]
  };
};
