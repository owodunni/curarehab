import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { link } from "$lib/i18n";

export const load: PageLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    throw redirect(303, await link("admin"));
  }

  return {};
};
