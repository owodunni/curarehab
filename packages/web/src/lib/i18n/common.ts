import type { Locale, Page } from "./types";

export const locales: Locale[] = ["en", "sv"];
export const defaultLocale: Locale = "sv";

export type Route =
  | "/om"
  | "/artiklar"
  | "/boka"
  | "/admin/login"
  | "/admin"
  | "/"
  | "/hitta"
  | "/sekretess"
  | "/terapeuter"
  | "/behandlingar";
export const pageWithRoute = {
  hem: "/",
  om: "/om",
  artiklar: "/artiklar",
  boka: "/boka",
  login: "/admin/login",
  admin: "/admin",
  hitta: "/hitta",
  sekretess: "/sekretess",
  terapeuter: "/terapeuter",
  behandlingar: "/behandlingar"
} satisfies Record<Page, Route>;

export const pageFromRoute = Object.fromEntries(
  Object.entries(pageWithRoute).map(([k, v]) => [v, k])
) as Record<Route, Page>;
