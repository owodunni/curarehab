import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { ArticlesQuery } from "./$types.gql";
import query from "./query.gql?raw";
import { PUBLIC_RUNTIME } from "$env/static/public";

export const load: PageServerLoad = async (event) => {
  const data = await event.locals.client
    .query<ArticlesQuery>(query, {
      filter: {
        slug: { _eq: event.params.slug },
        language: { _eq: event.params.lang ?? "sv" },
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();

  if (!data.data?.artiklar || data.data?.artiklar.length === 0)
    throw error(404, { message: "Article not found" });
  return { article: data.data.artiklar[0] };
};
