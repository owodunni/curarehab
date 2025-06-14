import type { PageServerLoad } from "./$types";
import type { KlinikBySlugQuery } from "./$types.gql";
import query from "./query.gql?raw";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;

  const result = await event.locals.client
    .query<KlinikBySlugQuery>(query, [
      {
        filter: { slug: { _eq: slug } },
      },
    ])
    .toPromise();

  const clinic = result.data?.Kliniker_list?.[0];

  if (!clinic) {
    throw error(404, "Clinic not found");
  }

  return {
    ...result,
    clinic,
  };
};
