import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
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
  const { data: bloggPosts } = await supabase.from("blogg").select("*");

  return {
    user: session.user,
    bloggPosts
  };
};
