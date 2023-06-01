import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { locales, type Locale, defaultLocale, type Route, loadTranslations } from "$lib/i18n";

export const prerender = true;

export const load: LayoutServerLoad = async (event) => {
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

  return {
    translations: await loadTranslations(locale, route as Route)
  };
};
