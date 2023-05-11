import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ parent }) => {
  const { session, l } = await parent();
  if (session) {
    throw redirect(303, l("admin"));
  }

  return {};
};
