import { createL, createT } from "$lib/i18n/t";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const t = createT(event.data.translations);
  const l = createL(t);

  // We can't use the `url` parameter here because it's not available on the server.
  // Instead we rely on the route to create the correct url.
  let route = event.route.id?.replace("[[lang]]", event.params.lang ?? "sv") || "";
  if (event.params.slug) route = route?.replace("[slug]", event.params.slug);

  return { ...event.data, t, l, params: event.params, route };
};
