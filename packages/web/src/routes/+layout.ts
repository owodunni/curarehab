import { loadTranslations, locales } from "$lib/i18n";
import type { Locale } from "$lib/i18n/types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const { pathname } = event.url;
  const { lang } = event.params;

  const locale: Locale = locales.find((l) => l === lang) || "sv";
  const route = ((): string => {
    if (!lang) return pathname;
    else if (pathname === `/${lang}`) return "/";
    else return pathname.replace(`/${lang}`, "");
  })();

  await loadTranslations(locale, route);

  return event.data;
};
