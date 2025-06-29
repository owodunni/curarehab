import type { PageServerLoad } from "./$types";
import type { HittaQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const result = await event.locals.client.query<HittaQuery>(query, []).toPromise();

  // Provide clinic data directly for ClinicList component
  const clinics = result.data?.Kliniker_list || [];

  return {
    ...result,
    clinics,
  };
};
