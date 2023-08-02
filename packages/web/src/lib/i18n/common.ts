import type { Locale, Page } from "./types";

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

export type Route =
  | "/"
  | "/om"
  | "/artiklar"
  | "/behandlingar"
  | "/cookies"
  | "/hitta"
  | "/personuppgiftspolicy"
  | "/terapeuter";
export const pageWithRoute = {
  artiklar: "/artiklar",
  behandlingar: "/behandlingar",
  cookies: "/cookies",
  hem: "/",
  hitta: "/hitta",
  om: "/om",
  personuppgiftspolicy: "/personuppgiftspolicy",
  terapeuter: "/terapeuter"
} satisfies Record<Page, Route>;

export const pageFromRoute = Object.fromEntries(
  Object.entries(pageWithRoute).map(([k, v]) => [v, k])
) as Record<Route, Page>;
