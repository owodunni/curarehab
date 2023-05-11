import { createL, createT } from "$lib/i18n/t";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const t = createT(event.data.translations);
  const l = createL(t);

  return { ...event.data, t, l };
};
