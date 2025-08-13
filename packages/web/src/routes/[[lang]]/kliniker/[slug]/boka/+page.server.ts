import type { PageServerLoad } from "./$types";
import type { KlinikBokaBySlugQuery } from "./$types.gql";
import query from "./query.gql?raw";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const { slug } = event.params;

  const result = await event.locals.client
    .query<KlinikBokaBySlugQuery>(query, {
      filter: { slug: { _eq: slug } },
    })
    .toPromise();

  const clinic = result.data?.Kliniker_list?.[0];

  if (!clinic) {
    throw error(404, "Clinic not found");
  }

  const { clinic_buddy_activity, clinic_buddy_location, clinic_buddy_provider } = clinic;
  const url = `https://ww1.clinicbuddy.com/onlinebooking/-3177?&params[activityGroups][]=${clinic_buddy_activity}&params[providerGroups][]=${clinic_buddy_provider}&params[locations][]=${clinic_buddy_location}`;
  throw redirect(307, url);
};
