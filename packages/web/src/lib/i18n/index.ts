import { browser } from "$app/environment";
import type { Config } from "sveltekit-i18n";
import i18n from "sveltekit-i18n";
import type { Categories, Locale } from "./types";

export const locales: Locale[] = ["en", "sv"];
const localeSet = new Set(locales);
export const defaultLocale: Locale = "sv";

const config = ((): Config => {
  const categories: ({ category: Categories } & { route?: string })[] = [
    { category: "common" },
    { category: "home", route: "/" },
    { category: "about", route: "/about" }
  ];

  // Create a loader for each locale and category
  const loaders = locales.flatMap((locale) => {
    return categories.map(({ category, route }) => {
      return {
        locale,
        key: category,
        ...(route && { routes: [route] }),
        loader: async () => {
          return (await import(`./${locale}/index.ts`))[category];
        }
      };
    });
  });

  return { loaders };
})();

export const { t, locale, loading, loadTranslations } = new i18n(config);

export const detectLocale = (): Locale => {
  if (!browser) return defaultLocale;
  const locale = navigator.language;
  const detectedLocales = [window.location.pathname.split("/")[1], locale, locale.split("-")[0]];
  for (const detectedLocale of detectedLocales) {
    if (localeSet.has(detectedLocale as Locale)) return detectedLocale as Locale;
  }
  return defaultLocale;
};
