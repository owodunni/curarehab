import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  if(event.params.lang && event.params.lang !== "en") throw error(404, "Not found");
  return event.data;
};
