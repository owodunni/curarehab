import { derived } from "svelte/store";
import { createTranslator, type Config, type NamedPlaceholder } from "./translator";
import type {
  TranslationGroup,
  Locale,
  Page,
  CommonTranslations,
  HemTranslations,
  Translations,
  OmTranslations,
  BlogTranslations,
  BokaTranslations,
  LogInTranslations,
  TranslationsByGroup,
  AdminTranslations
} from "./types";
export type { Page };

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

export type Route = "/om" | "/blog" | "/boka" | "/login" | "/admin" | "/";
export const pageWithRoute = {
  hem: "/",
  om: "/om",
  blog: "/blog",
  boka: "/boka",
  login: "/login",
  admin: "/admin"
} satisfies Record<Page, Route>;

export const pageFromRoute = Object.fromEntries(
  Object.entries(pageWithRoute).map(([k, v]) => [v, k])
) as Record<Route, Page>;

const config: Config<TranslationGroup, Locale> = {
  loader: async (locale: Locale, category: TranslationGroup): Promise<Record<string, string>> => {
    const { translations } = (await import(`./${locale}/index.ts`)) as {
      translations?: TranslationsByGroup;
    };
    if (!translations) throw new Error(`No translations found for ${locale} in ${category}`);
    if (!translations[category])
      throw new Error(`Translation category ${category} not found for ${locale}`);
    return translations[category];
  }
};

const translator = createTranslator(config);

export const loadTranslations = async (locale: Locale, route: Route) => {
  const page = pageFromRoute[route]
    ? pageFromRoute[route]
    : route.startsWith("/blog")
    ? "blog"
    : undefined;
  if (!page) {
    throw new Error(`No page found for route ${route}`);
  }

  await translator.loadCategories([page, "common"], locale);
};

/**
 * {@link t} is a type-safe translation function. It takes a translation group and a translation key
 * and returns the translation.
 */
export const t = derived(translator.t, (t) => {
  function r(group: "common", key: keyof CommonTranslations, params?: NamedPlaceholder): string;
  function r(group: "hem", key: keyof HemTranslations, params?: NamedPlaceholder): string;
  function r(group: "om", key: keyof OmTranslations, params?: NamedPlaceholder): string;
  function r(group: "blog", key: keyof BlogTranslations, params?: NamedPlaceholder): string;
  function r(group: "boka", key: keyof BokaTranslations, params?: NamedPlaceholder): string;
  function r(group: "login", key: keyof LogInTranslations, params?: NamedPlaceholder): string;
  function r(group: "admin", key: keyof AdminTranslations, params?: NamedPlaceholder): string;
  function r(group: TranslationGroup, key: Translations, params?: NamedPlaceholder): string {
    return t(group, key, params);
  }
  return r;
});

const _l = derived(t, (t) => (link: string) => t("common", "link", { link }));

/**
 * {@link l} is a type-safe link function. It takes a page and returns the link to that page.
 */
export const l = derived(_l, (l) => (page: Page) => l(pageWithRoute[page]));
export const link = async (page: Page): Promise<string> => {
  return new Promise((resolve) => {
    const u = l.subscribe((value) => {
      resolve(value(page));
      setTimeout(() => u(), 0);
    });
  });
};
