import { PUBLIC_RUNTIME } from "$env/static/public";
import type { Link } from "$lib/api";
import type { PageServerLoad } from "./$types";
import type { ArticlesAndTerapeutsQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const data = await event.locals.client
    .query<ArticlesAndTerapeutsQuery>(query, {
      filter: {
        language: { _eq: event.params.lang ?? "sv" },
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      },
      filter2: {
        ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } })
      }
    })
    .toPromise();

  const banner = data?.data?.header?.banner;

  return {
    ...data,
    data: {
      ...data?.data,
      header: {
        ...(banner &&
          banner?.Link && {
            banner: {
              link: banner?.Link as Link,
              text: banner?.Text ?? "",
              title: banner?.Title ?? ""
            }
          })
      }
    }
  };
};
