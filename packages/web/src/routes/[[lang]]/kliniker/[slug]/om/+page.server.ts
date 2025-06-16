import type { PageServerLoad } from "./$types";
import query from "./query.gql?raw";
import { error } from "@sveltejs/kit";
import type { KlinikOmBySlugQuery } from "./$types.gql";

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;

  const result = await event.locals.client
    .query<KlinikOmBySlugQuery>(query, {
      filter: { slug: { _eq: slug } },
      terapeutFilter: {
        directus_users_id: {
          kliniker: {
            Kliniker_list_id: {
              slug: { _eq: slug },
            },
          },
        },
      },
    })
    .toPromise();

  const clinic = result.data?.Kliniker_list?.[0]?.om;

  if (!clinic) {
    throw error(404, "Clinic not found");
  }

  return {
    ...result,
    clinic,
    slug,
  };
};
