import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import { writable } from "svelte/store";
import Analytics from "./Analytics.svelte";

// Mock modules with factory functions
vi.mock("$app/stores", () => ({
  page: writable({
    url: { pathname: "/test-path" },
  }),
}));

vi.mock("$app/environment", () => ({
  browser: true,
}));

vi.mock("$env/static/public", () => ({
  PUBLIC_MEASUREMENTS_ID: "test-measurement-id",
}));

vi.mock("$lib/cookies", () => ({
  cookieSettings: writable({
    permission: undefined,
    cookiePermissions: { googleAnalytics: false },
  }),
  setCookiePermissions: vi.fn(),
  getGtag: vi.fn(() => vi.fn()),
}));

// Mock the i18n functions
const mockT = vi.fn((category: string, key: string) => `${category}.${key}`);
const mockL = vi.fn((page: string) => `/${page}`);

describe("Analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic structure when permission is undefined", () => {
    const { container } = render(Analytics, {
      t: mockT,
      l: mockL,
    });

    // Initially should not show banner (show starts as false)
    expect(container.querySelector(".theme-sand-dark")).toBeNull();
  });

  it("does not render banner when permission is already set", async () => {
    // Import the mocked store to update it
    const { cookieSettings } = await import("$lib/cookies");

    cookieSettings.set({
      permission: true,
      updated: new Date().toISOString(),
      cookiePermissions: { googleAnalytics: true, googleAds: false },
    });

    const { container } = render(Analytics, {
      t: mockT,
      l: mockL,
    });

    // Should not show banner when permission is already set
    expect(container.querySelector(".theme-sand-dark")).toBeNull();
  });
});
