import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPost } from "@curarehab/api";

export const load: PageLoad = async ({ url, fetch, parent }) => {
  const { session, l } = await parent();
  if (!session) {
    throw redirect(303, l("login"));
  }

  const loadPost = async (name: string): Promise<BlogPost | undefined> => {
    const slug = url.searchParams.get(name);
    if (!slug) {
      return;
    }

    const post = await fetch(`/api/artiklar/${slug}`);
    return (await post.json()) as BlogPost;
  };

  const [post, postParent] = await Promise.all([loadPost("post"), loadPost("parent")]);
  return {
    ...(post && { post }),
    ...(postParent && { parent: postParent })
  };
};
