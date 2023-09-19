import type { Locale, Page } from "./types";

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

export type Route =
  | "/"
  | "/om"
  | "/om/cookies"
  | "/artiklar"
  | "/behandlingar"
  | "/hitta"
  | "/om/personuppgiftspolicy"
  | "/terapeuter"
  | "/skadekompassen";
export const pageWithRoute = {
  artiklar: "/artiklar",
  behandlingar: "/behandlingar",
  cookies: "/om/cookies",
  hem: "/",
  hitta: "/hitta",
  om: "/om",
  personuppgiftspolicy: "/om/personuppgiftspolicy",
  terapeuter: "/terapeuter",
  skadekompassen: "/skadekompassen"
} satisfies Record<Page, Route>;

export const pageFromRoute = Object.fromEntries(
  Object.entries(pageWithRoute).map(([k, v]) => [v, k])
) as Record<Route, Page>;
