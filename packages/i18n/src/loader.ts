import type { Config, TranslationLoader, TranslatorFactory } from "./types";

export const createTranslationLoader: TranslatorFactory = <
  Category extends string,
  Key extends string,
  Locale extends string
>(
  config: Config<Category, Locale>
) => {
  return {
    loadCategories: async (categories, locale) => {
      return Object.fromEntries(
        await Promise.all(
          categories.map(async (category) => [category, await config.loader(locale, category)])
        )
      );
    }
  } satisfies TranslationLoader<Category, Key, Locale>;
};
