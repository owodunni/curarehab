import type { Config } from "sveltekit-i18n";
import i18n from "sveltekit-i18n";
import type { Categories, Locale } from "./types";

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

const config = ((): Config => {
  const categories: ({ category: Categories } & { route?: string })[] = [
    { category: "common" },
    { category: "hem", route: "/" },
    { category: "om", route: "/om" }
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
