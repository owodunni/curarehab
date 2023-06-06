import type { PageServerLoad } from "./$types";
import type { ArticlesMetaDataQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  return event.locals.client
    .query<ArticlesMetaDataQuery>(query, {
      filter: { language: { _eq: event.params.lang ?? "sv" } }
    })
    .toPromise();
};
