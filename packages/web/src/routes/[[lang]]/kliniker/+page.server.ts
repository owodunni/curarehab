import type { PageServerLoad } from "./$types";
import type { KlinikerOverviewQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const result = await event.locals.client.query<KlinikerOverviewQuery>(query, []).toPromise();

  return {
    ...result,
    klinikerList: result.data?.Kliniker_list || [],
    kliniker: result.data?.kliniker?.page,
  };
};
