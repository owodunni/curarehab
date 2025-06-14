import type { PageServerLoad } from "./$types";
import type { KlinikerListQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const result = await event.locals.client.query<KlinikerListQuery>(query, []).toPromise();
  return {
    ...result,
    kliniker: result.data?.Kliniker_list || [],
  };
};
