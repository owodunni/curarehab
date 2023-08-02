import { PUBLIC_RUNTIME } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import type { BehandlingarQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  return event.locals.client
    .query<BehandlingarQuery>(query, {
      filter: {
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();
};
