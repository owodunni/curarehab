import { derived } from "svelte/store";
import type { Config, Parser } from "sveltekit-i18n";
import i18n from "sveltekit-i18n";
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
  ProfileTranslations
} from "./types";
export type { Page };

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

type Route = { route: string };
export const pageWithRoute: Record<Page, Route> = {
  hem: { route: "/" },
  om: { route: "/om" },
  blog: { route: "/blog" },
  boka: { route: "/boka" },
  login: { route: "/login" },
  profile: { route: "/profile" }
};

const groupWithRoute: Record<TranslationGroup, Partial<Route>> = {
  common: {},
  ...pageWithRoute
};

const config = ((): Config => {
  // Create a loader for each locale and category
  const loaders = locales.flatMap((locale) => {
    return Object.entries<Partial<Route>>(groupWithRoute).map(([category, { route }]) => {
      return {
        locale,
        key: category,
        ...(route && { routes: [route] }),
        loader: async () => {
          return ((await import(`./${locale}/index.ts`))["translations"] as TranslationsByGroup)[
            category as TranslationGroup
          ];
        }
      };
    });
  });

  return { loaders };
})();

const _i18n = new i18n(config);
export const loadTranslations = _i18n.loadTranslations;

/**
 * {@link t} is a type-safe translation function. It takes a translation group and a translation key
 * and returns the translation.
 */
export const t = derived(_i18n.t, (t) => {
  function r(
    group: "common",
    key: keyof CommonTranslations,
    ...parserParams: Parser.Params
  ): string;
  function r(group: "hem", key: keyof HemTranslations, ...parserParams: Parser.Params): string;
  function r(group: "om", key: keyof OmTranslations, ...parserParams: Parser.Params): string;
  function r(group: "blog", key: keyof BlogTranslations, ...parserParams: Parser.Params): string;
  function r(group: "boka", key: keyof BokaTranslations, ...parserParams: Parser.Params): string;
  function r(group: "login", key: keyof LogInTranslations, ...parserParams: Parser.Params): string;
  function r(
    group: "profile",
    key: keyof ProfileTranslations,
    ...parserParams: Parser.Params
  ): string;
  function r(group: TranslationGroup, key: Translations, ...parserParams: Parser.Params): string {
    return t(`${group}.${key}`, ...parserParams);
  }
  return r;
});

const _l = derived(t, (t) => (link: string) => t("common", "link", { default: link }));

/**
 * {@link l} is a type-safe link function. It takes a page and returns the link to that page.
 */
export const l = derived(_l, (l) => (page: Page) => l(pageWithRoute[page].route));
