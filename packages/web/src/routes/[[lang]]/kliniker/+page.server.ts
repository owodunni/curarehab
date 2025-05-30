import { PUBLIC_RUNTIME } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import type { KlinikerMetaDataQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const data = await event.locals.client
    .query<KlinikerMetaDataQuery>(query, {
      filter: {
        language: { _eq: event.params.lang ?? "sv" },
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      },
      filter2: {
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();


  return {
    ...data,
  };
};
