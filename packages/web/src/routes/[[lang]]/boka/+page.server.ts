import type { Link } from "$lib/api";
import type { PageServerLoad } from "./$types";
import type { BokaPageQuery } from "./$types.gql";
import query from "./query.gql?raw";

export const load: PageServerLoad = async (event) => {
  const result = await event.locals.client.query<BokaPageQuery>(query, []).toPromise();

  // Transform the boka page data to match TextPage component expectations
  const bokaPageData = result.data?.boka?.boka;
  const transformedBokaPage = bokaPageData
    ? {
        ...bokaPageData,
        links:
          bokaPageData.links?.map((link) => link?.links_id).filter((l): l is Link => !!l) || [],
      }
    : null;

  // Provide clinic data directly for ClinicList component
  const clinics = result.data?.Kliniker_list || [];

  return {
    ...result,
    bokaPage: transformedBokaPage,
    clinics,
  };
};
