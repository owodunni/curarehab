import type { Terapheut } from "@curarehab/api";
import { fail, type Actions } from "@sveltejs/kit";

function parseForm(data: FormData) {
  const keys = [
    "first_name",
    "last_name",
    "profile_excerpt",
    "profile_text",
    "profile_excerpt_en",
    "profile_text_en"
  ] satisfies (keyof Terapheut)[];

  const post = Object.fromEntries(keys.map((k) => [k, data.get(k)])) as Record<
    (typeof keys)[number],
    FormDataEntryValue | null
  >;

  return post;
}

export const actions = {
  update: async ({ request, url, locals: { supabase } }) => {
    const terapheut = parseForm(await request.formData());

    const id = url.searchParams.get("id");

    if (!id) {
      return fail(400, {
        ...terapheut,
        idMissing: true
      });
    }
    const s = supabase.s;

    const res = await s
      .from("terapheut")
      .update({
        first_name: terapheut.first_name?.toString(),
        last_name: terapheut.last_name?.toString(),
        profile_excerpt: terapheut.profile_excerpt?.toString(),
        profile_text: terapheut.profile_text?.toString(),
        profile_excerpt_en: terapheut.profile_excerpt_en?.toString(),
        profile_text_en: terapheut.profile_text_en?.toString()
      })
      .eq("user_id", id);

    if (res.error) {
      return fail(500, { ...terapheut, error: res.error });
    }
    return terapheut;
  }
} satisfies Actions;
