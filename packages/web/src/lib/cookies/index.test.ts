import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { cookieSettings, updateCookiePermissions } from ".";
import { get } from "svelte/store";

function isExpectedTimestamp(date: string, expectedTime: string) {
  return new Date(date).getTime() === new Date(expectedTime).getTime();
}

function lessThanDate(d1: string, d2: string) {
  return new Date(d1) < new Date(d2);
}

describe("cookies", () => {
  beforeEach(() => {
    // Use fake timers for deterministic behavior
    vi.useFakeTimers();
    // Set a fixed date for consistent testing
    vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));

    // Reset store to initial state
    cookieSettings.set({ permission: undefined });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should update store when updateCookiePermissions is called", () => {
    const initialCookies = get(cookieSettings);
    // In Svelte 5 test environment (browser = true with jsdom), store starts with defaultCookiePermission
    expect(initialCookies.permission).toBe(undefined);

    // Test setting permissions to true
    updateCookiePermissions({ googleAnalytics: true, googleAds: false });

    const cookiesAfterTrue = get(cookieSettings);
    expect(cookiesAfterTrue.permission).toBe(true);
    if (cookiesAfterTrue.permission !== undefined) {
      expect(isExpectedTimestamp(cookiesAfterTrue.updated, "2024-01-01T12:00:00.000Z")).toBe(true);
      expect(cookiesAfterTrue.cookiePermissions).toEqual({
        googleAnalytics: true,
        googleAds: false,
      });
    }

    // Advance time by 1 second for the next update
    vi.advanceTimersByTime(1000);

    // Test updating permissions
    updateCookiePermissions({ googleAnalytics: false, googleAds: true });

    const cookiesAfterUpdate = get(cookieSettings);
    expect(cookiesAfterUpdate.permission).toBe(true); // Still true because googleAds is true
    if (cookiesAfterUpdate.permission !== undefined && cookiesAfterTrue.permission !== undefined) {
      expect(lessThanDate(cookiesAfterTrue.updated, cookiesAfterUpdate.updated)).toBe(true);
      expect(cookiesAfterUpdate.cookiePermissions).toEqual({
        googleAnalytics: false,
        googleAds: true,
      });
    }

    // Test setting all permissions to false
    updateCookiePermissions({ googleAnalytics: false, googleAds: false });
    const cookiesAfterFalse = get(cookieSettings);
    expect(cookiesAfterFalse.permission).toBe(false);
    if (cookiesAfterFalse.permission !== undefined) {
      expect(cookiesAfterFalse.cookiePermissions).toEqual({
        googleAnalytics: false,
        googleAds: false,
      });
    }
  });
});
