import type { BlogPost, DbError } from "@curarehab/api";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { marked } from "marked";

export const load: PageLoad = async (event) => {
  const post = (await (await event.fetch(`/api/artiklar/${event.params.slug}`)).json()) as
    | DbError
    | BlogPost;

  if ("code" in post) throw error(post.code, post.message);

  return {
    post: { ...post, html: marked.parse(post.post || "") }
  };
};
