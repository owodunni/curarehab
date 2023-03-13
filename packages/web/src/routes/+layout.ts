import { defaultLocale, loadTranslations, locales } from "$lib/i18n";
import type { Locale } from "$lib/i18n/types";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async (event) => {
  const { pathname } = event.url;
  const { lang } = event.params;

  const localeExists = locales.find((l) => l === lang);
  if (lang && !localeExists) throw error(404, "Not found");

  const locale: Locale = localeExists || defaultLocale;
  const route = ((): string => {
    if (!lang) return pathname;
    else if (pathname === `/${lang}`) return "/";
    else return pathname.replace(`/${lang}`, "");
  })();

  if (localeExists === defaultLocale) throw redirect(308, route);

  await loadTranslations(locale, route);

  return event.data;
};
