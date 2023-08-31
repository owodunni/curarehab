import { describe, expect, it } from "vitest";
import { cookieSettings, updateCookiePermissions } from ".";
import { get } from "svelte/store";

function lessThanNow(date: string) {
  return new Date(date) < new Date();
}

function lessThanDate(d1: string, d2: string) {
  return new Date(d1) < new Date(d2);
}

describe("cookies", () => {
  it("should update store when updateCookiePermissions is called", () => {
    const cookies = get(cookieSettings);
    if (cookies.permission === undefined) {
      expect.fail("cookieSettings.permission is undefined");
    }
    expect(cookies.permission).toBe(false);
    expect(lessThanNow(cookies.updated)).toBe(true);
    expect(cookies.cookiePermissions).toEqual({ googleAnalytics: false, googleAds: false });

    const newCookiePermissions = { ...cookies.cookiePermissions, googleAnalytics: true };

    updateCookiePermissions(newCookiePermissions);

    const newCookies = get(cookieSettings);

    expect(newCookies.permission).toBe(true);
    if (newCookies.permission === undefined) {
      expect.fail("cookieSettings.permission is undefined");
    }

    expect(lessThanDate(cookies.updated, newCookies.updated)).toBe(true);
    expect(newCookies.cookiePermissions).toEqual({ googleAnalytics: true, googleAds: false });

    updateCookiePermissions({ googleAnalytics: false, googleAds: false });
    const newCookies2 = get(cookieSettings);
    if (newCookies2.permission === undefined) {
      expect.fail("cookieSettings.permission is undefined");
    }
    expect(newCookies2.permission).toEqual(false);
    expect(newCookies2.cookiePermissions).toEqual({ googleAnalytics: false, googleAds: false });
  });
});
