import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Terapheut } from "@curarehab/api";

export const load: PageLoad = async ({ url, fetch, parent }) => {
  const { session, l } = await parent();
  if (!session) {
    throw redirect(303, l("login"));
  }

  const id = url.searchParams.get("id");
  if (!id) {
    throw redirect(303, l("admin"));
  }

  const terapheut = (await (await fetch(`/api/terapeuter/${id}`)).json()) as Terapheut;

  return {
    terapheut
  };
};
