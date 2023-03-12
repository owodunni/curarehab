import type { Config } from "sveltekit-i18n";
import i18n from "sveltekit-i18n";
import type { Categories, Locale } from "./types";

export const locales: Locale[] = ["en", "sv"];

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
          console.log("loading", locale, category, `./${locale}/index.ts`);
          return (await import(`./${locale}/index.ts`))[category];
        }
      };
    });
  });

  return { loaders };
})();

export const { t, locale, loading, loadTranslations } = new i18n(config);

/*export const detectLocale = (locale: string, defaultLocale: Locale = "sv"): Locale => {
  const detectedLocales = [locale, locale.split("-")[0]];

  return locales.find((locale) => detectedLocales.includes(locale)) || defaultLocale;
};*/
