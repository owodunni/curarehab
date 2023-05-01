import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPostMetaData, DbError } from "@curarehab/api";

export const load: PageLoad = async (event) => {
  const posts = (await (await event.fetch("/api/blog")).json()) as DbError | BlogPostMetaData[];

  if ("code" in posts) throw error(posts.code, posts.message);
  // TODO: Check if author is valid, if locale is valid and if post is published

  return {
    posts
  };
};
