import type { PageServerLoad } from "./$types";
import query from "./query.gql?raw";
import { error } from "@sveltejs/kit";
import type { KlinikHittaBySlugQuery } from "./$types.gql";

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;

  const result = await event.locals.client
    .query<KlinikHittaBySlugQuery>(query, {
      filter: { slug: { _eq: slug } },
    })
    .toPromise();

  const clinicData = result.data?.Kliniker_list?.[0];
  const clinic = clinicData?.hitta;

  if (!clinic || !clinicData) {
    throw error(404, "Clinic not found");
  }

  return {
    ...result,
    clinic,
    params: { slug },
    clinicData,
  };
};
