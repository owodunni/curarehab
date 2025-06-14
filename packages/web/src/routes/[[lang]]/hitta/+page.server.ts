import type { PageServerLoad } from "./$types";
import type { HittaQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  return event.locals.client.query<HittaQuery>(query, []).toPromise();
};
