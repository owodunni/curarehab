import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.params.lang === "en") throw redirect(302, "/skadekompassen");
  return;
};
