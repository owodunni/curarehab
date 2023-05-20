import type { BlogPostMetaData, DbError, TerapheutMetaData } from "@curarehab/api";
import type { PageLoad } from "./$types";
import { marked } from "marked";

export const load: PageLoad = async ({ fetch }) => {
  const [terapheuts, posts] = await Promise.all([
    (await (await fetch(`/api/terapeuter`)).json()) as TerapheutMetaData[],
    (await (await fetch("/api/artiklar?limit=6")).json()) as DbError | BlogPostMetaData[]
  ]);

  return {
    terapheuts,
    posts: ("code" in posts
      ? []
      : posts.map((p) => {
          p.excerpt = marked.parse(p.excerpt);
          return p;
        })) as BlogPostMetaData[]
  };
};
