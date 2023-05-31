import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { marked } from "marked";

export const load: PageLoad = async ({ fetch }) => {
  const posts = (await (await fetch("/api/artiklar")).json()) as DbError | BlogPostMetaData[];

  if ("code" in posts) throw error(posts.code, posts.message);
  // TODO: Check if author is valid, if locale is valid and if post is published

  for (let i = 0; i < posts.length; i++) {
    posts[i].excerpt = marked.parse(posts[i].excerpt);
  }

  return {
    posts
  };
};
