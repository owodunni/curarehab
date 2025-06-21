import type { PageServerLoad } from "./$types";
import type { KlinikBySlugQuery } from "./$types.gql";
import query from "./query.gql?raw";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;

  const result = await event.locals.client
    .query<KlinikBySlugQuery>(query, {
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

  const clinic = result.data?.Kliniker_list?.[0];

  if (!clinic) {
    throw error(404, "Clinic not found");
  }

  return {
    ...result,
    slug: clinic.slug,
    clinic: clinic.klinik_page,
    boka: clinic.boka,
    om: clinic.om,
    hitta: clinic.hitta,
  };
};
