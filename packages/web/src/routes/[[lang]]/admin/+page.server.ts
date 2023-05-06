import type { BlogPostMetaData, SupabaseLightClient } from "@curarehab/api";
import { fail, type Actions } from "@sveltejs/kit";

function parseForm(data: FormData) {
  const keys = [
    "title",
    "slug",
    "excerpt",
    "parent",
    "published",
    "parent_title",
    "parent_id"
  ] satisfies (keyof BlogPostMetaData | "parent_title" | "parent_id")[];

  const post = Object.fromEntries(keys.map((k) => [k, data.get(k)])) as Record<
    (typeof keys)[number],
    FormDataEntryValue | null
  >;

  return post;
}

async function postCrud(
  data: FormData,
  action: "update" | "create",
  supabase: SupabaseLightClient
) {
  const post = parseForm(data);

  if (!post.slug || !post.title) {
    return fail(400, {
      ...post,
      ...(!post.slug && { slugMissing: true }),
      ...(!post.title && { titleMissing: true })
    });
  }

  if (action === "update") {
    const res = await supabase.s
      .from("blog")
      .update({
        title: post.title.toString(),
        excerpt: post.excerpt?.toString(),
        slug: post.slug.toString(),
        published: post.published?.toString() === "on",
        updated_at: new Date().toISOString()
      })
      .eq("slug", post.slug);

    if (res.error) {
      return fail(500, { ...post, error: res.error });
    }
    return post;
  } else {
    const author = (await supabase.s.auth.getUser()).data.user?.id;
    if (!author) return fail(400, { ...post, userNotSignedIn: true });

    const parentId = post.parent_id ? parseInt(post.parent_id.toString()) : undefined;

    if (parentId && isNaN(parentId)) {
      return fail(400, { ...post, parentMalformed: true });
    }

    const res = await supabase.s
      .from("blog")
      .insert([
        {
          title: post.title.toString(),
          excerpt: post.excerpt?.toString(),
          slug: post.slug.toString(),
          published: post.published?.toString() === "on",
          author,
          updated_at: new Date().toISOString(),
          ...(parentId && { parent: parentId }),
          locale: "sv"
        }
      ])
      .select("*")
      .single();
    if (res.error) {
      return fail(500, { ...post, error: res.error });
    }
    return post;
  }
}

export const actions = {
  create: async ({ request, locals: { supabase } }) => {
    return postCrud(await request.formData(), "create", supabase);
  },
  update: async ({ request, locals: { supabase } }) => {
    return postCrud(await request.formData(), "update", supabase);
  }
} satisfies Actions;
