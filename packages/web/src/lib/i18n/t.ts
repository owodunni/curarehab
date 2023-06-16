import type { LoadedTranslations, NamedPlaceholder } from "@curarehab/i18n";
import { createTranslator } from "@curarehab/i18n/src/translator";
import type {
  ArticleTranslations,
  BokaTranslations,
  CommonTranslations,
  CookiesTranslations,
  FindTranslations,
  HemTranslations,
  OmTranslations,
  Page,
  PrivacyTranslations,
  TerapheutTranslations,
  TranslationGroup,
  Translations,
  TreatmentsTranslations
} from "./types";
import { pageWithRoute } from "./common";

/**
 * {@link t} is a type-safe translation function. It takes a translation group and a translation key
 * and returns the translation.
 */
export const createT = (translations: LoadedTranslations<TranslationGroup, Translations>) => {
  const { t } = createTranslator(translations);

  function r(group: "common", key: keyof CommonTranslations, params?: NamedPlaceholder): string;
  function r(group: "hem", key: keyof HemTranslations, params?: NamedPlaceholder): string;
  function r(group: "om", key: keyof OmTranslations, params?: NamedPlaceholder): string;
  function r(group: "artiklar", key: keyof ArticleTranslations, params?: NamedPlaceholder): string;
  function r(group: "boka", key: keyof BokaTranslations, params?: NamedPlaceholder): string;
  function r(group: "cookies", key: keyof CookiesTranslations, params?: NamedPlaceholder): string;
  function r(group: "hitta", key: keyof FindTranslations, params?: NamedPlaceholder): string;
  function r(
    group: "behandlingar",
    key: keyof TreatmentsTranslations,
    params?: NamedPlaceholder
  ): string;
  function r(
    group: "personuppgiftspolicy",
    key: keyof PrivacyTranslations,
    params?: NamedPlaceholder
  ): string;
  function r(
    group: "terapeuter",
    key: keyof TerapheutTranslations,
    params?: NamedPlaceholder
  ): string;
  function r(group: TranslationGroup, key: Translations, params?: NamedPlaceholder): string {
    return t(group, key, params);
  }
  return r;
};

/**
 * {@link createL} is a type-safe link function. It takes a page and returns the link to that page.
 */
export const createL = (_t: ReturnType<typeof createT>) => (page: Page) =>
  _t("common", "link", { link: pageWithRoute[page] });

export type T = ReturnType<typeof createT>;
export type L = ReturnType<typeof createL>;
