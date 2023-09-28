import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import query from "./query.gql?raw";
import { PUBLIC_RUNTIME } from "$env/static/public";
import type { SkadekompassenMetaDataQuery } from "./$types.gql";

export const load: PageServerLoad = async (event) => {
  if (event.params.lang === "en") throw redirect(302, "/skadekompassen");
  return event.locals.client
    .query<SkadekompassenMetaDataQuery>(query, {
      filter: {
        language: { _eq: event.params.lang ?? "sv" },
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();
};
