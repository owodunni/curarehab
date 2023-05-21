import type { T } from "$lib/i18n/t";

export const getTitle = (title: string, t: T) => {
  if (title === "titleWeb" || title === "titleFysio" || title === "titleNaprapat") {
    return t("common", title);
  }
  return t("common", "titleNaprapat");
};
