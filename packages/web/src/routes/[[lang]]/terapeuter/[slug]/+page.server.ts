import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { TerapeutsQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const prerender = false;

export const load: PageServerLoad = async (event) => {
  const data = await event.locals.client
    .query<TerapeutsQuery>(query, {
      filter: {
        slug: {
          _eq: event.params.slug
        }
      }
    })
    .toPromise();

  const user = data.data?.terapeuter_directus_users.filter((u) => u.directus_users_id);
  if (!user || user.length === 0 || !user[0].directus_users_id)
    throw error(404, { message: "User not found" });
  return { terapeut: user[0].directus_users_id };
};
