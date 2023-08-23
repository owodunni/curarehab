import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const cookies = ["googleAnalytics", "googleAds"] as const;
type Cookies = (typeof cookies)[number];
type CookiePermission = Record<Cookies, boolean>;
type CookieSettings =
  | { permission: boolean; updated: string; cookiePermission: CookiePermission }
  | { permission: undefined };

const defaultCookiePermission = {
  permission: undefined
} satisfies CookieSettings;

const serverCookiePermission = {
  permission: false,
  updated: new Date().toISOString(),
  cookiePermission: { googleAnalytics: false, googleAds: false }
} satisfies CookieSettings;

// parse sting to get date or return undefined
function parseDate(date: string): Date | undefined {
  try {
    return new Date(date);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

function getCookiePermission(): CookieSettings {
  const cookiePermission = localStorage.getItem("cookiePermission");
  if (cookiePermission) {
    const settings = JSON.parse(cookiePermission) as CookieSettings;

    if (settings.permission !== undefined) {
      const lastUpdated = parseDate(settings.updated);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      // if we don't know when storage values where set
      // or if permission was given more than 12 months ago
      // or if permission was rejected more than 3 days ago
      // we return defaultCookiePermission wich will trigger
      // the cookie banner
      if (
        !lastUpdated ||
        (settings.permission && lastUpdated < twelveMonthsAgo) ||
        lastUpdated < threeDaysAgo
      ) {
        localStorage.removeItem("cookiePermission");
        return defaultCookiePermission;
      }
      return settings;
    }
  }

  return defaultCookiePermission;
}

export const cookieSettings = writable<CookieSettings>(
  browser ? getCookiePermission() : serverCookiePermission
);

if (browser) {
  cookieSettings.subscribe((settings) => {
    console.log(settings);
    if (settings.permission === undefined) {
      localStorage.removeItem("cookiePermission");
    } else localStorage.setItem("cookiePermission", JSON.stringify(settings));
  });
}

function updateCookiesPermission(cookiePermission: CookiePermission) {
  cookieSettings.set({
    permission: Object.values(cookiePermission).every(Boolean),
    updated: new Date().toISOString(),
    cookiePermission
  });
}
export function setCookiePermissions(value: boolean) {
  updateCookiesPermission(
    Object.fromEntries(cookies.map((key) => [key, value])) as CookiePermission
  );
}

export function getGtag(): Gtag.Gtag | undefined {
  if (typeof gtag !== "undefined")
    /* global gtag */
    return gtag;
  return undefined;
}
