import { createTranslationLoader, type Config } from "@curarehab/i18n";
import type { TranslationGroup, Locale, Page, TranslationsByGroup } from "./types";
import { pageFromRoute, type Route } from "./common";
export type { Page, Locale, Route };
export { locales, defaultLocale } from "./common";

const config: Config<TranslationGroup, Locale> = {
  loader: async (locale: Locale, category: TranslationGroup): Promise<Record<string, string>> => {
    const translations = (await import(`./${locale}/${category}.ts`)) as TranslationsByGroup;
    if (!translations) throw new Error(`No translations found for ${locale} in ${category}`);
    if (!translations[category])
      throw new Error(`Translation category ${category} not found for ${locale}`);
    return translations[category];
  }
};

const translator = createTranslationLoader(config);

export const loadTranslations = async (locale: Locale, route: Route) => {
  const page = pageFromRoute[route]
    ? pageFromRoute[route]
    : route.startsWith("/artiklar")
    ? "artiklar"
    : route.startsWith("/admin")
    ? "admin"
    : undefined;
  if (!page) {
    throw new Error(`No page found for route ${route}`);
  }

  return await translator.loadCategories([page, "common"], locale);
};
