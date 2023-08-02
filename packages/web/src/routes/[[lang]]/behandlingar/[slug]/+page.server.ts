import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { BehandlingQuery } from "./$types.gql";
import query from "./query.gql?raw";
import { PUBLIC_RUNTIME } from "$env/static/public";

export const load: PageServerLoad = async (event) => {
  const data = await event.locals.client
    .query<BehandlingQuery>(query, {
      filter: {
        Slug: { _eq: event.params.slug },
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();

  if (!data.data?.Behandlingar || data.data?.Behandlingar.length === 0)
    throw error(404, { message: "Treatment not found" });

  return { behandling: data.data.Behandlingar[0] };
};
