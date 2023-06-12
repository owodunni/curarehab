import type { LayoutServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { locales, type Locale, defaultLocale, type Route, loadTranslations } from "$lib/i18n";
import { PUBLIC_RUNTIME } from "$env/static/public";
import query from "./query.gql?raw";
import type { WidgetsQuery } from "./$types.gql";

/**
 * We don't prerender in preview mode because we want to be able to update the content
 * dynamically.
 */
export const prerender = PUBLIC_RUNTIME === "development" || PUBLIC_RUNTIME === "production";

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

  const [translations, widgets] = await Promise.all([
    loadTranslations(locale, route as Route),
    event.locals.client.query<WidgetsQuery>(query, []).toPromise()
  ] as const);

  return {
    translations,
    widgets: widgets.data
  };
};
