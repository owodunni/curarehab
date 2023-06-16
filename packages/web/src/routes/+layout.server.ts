import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
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
  async function loadData(locale: Locale, route: Route) {
    return Promise.all([
      loadTranslations(locale, route as Route),
      event.locals.client.query<WidgetsQuery>(query, []).toPromise()
    ] as const);
  }

  async function getLocaleAndRoute(): Promise<[Locale, Route]> {
    const { pathname } = event.url;
    const { lang } = event.params;

    const localeExists = locales.find((l) => l === lang);
    if (lang && !localeExists) return ["sv", "/"];

    const locale: Locale = localeExists || defaultLocale;
    const route = ((): string => {
      if (!lang) return pathname;
      else if (pathname === `/${lang}`) return "/";
      else return pathname.replace(`/${lang}`, "");
    })();
    if (localeExists === defaultLocale) throw redirect(308, route);

    return [locale, route as Route];
  }

  const [locale, route] = await getLocaleAndRoute();

  // When navigating to a route that doesn't exist loadData can throw a No page found exception
  const [translations, widgets] = await loadData(locale, route).catch(() => loadData(locale, "/"));
  return {
    translations,
    widgets: widgets.data
  };
};
