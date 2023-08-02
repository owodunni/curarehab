import { expect, test } from "@playwright/test";
import { hem as svHem } from "$lib/i18n/sv/hem";

test.describe("Test locale, SEO, status and redirects", () => {
  for (const { route, expectedRoute, status } of [
    { route: "/", status: 200 },
    { route: "/sv", expectedRoute: "/", data: svHem, status: 200 },
    { route: "/en", status: 200 },
    { route: "/om", status: 200 },
    { route: "/sv/om", expectedRoute: "/om", status: 200 },
    { route: "/en/om", status: 200 },
    { route: "/no", status: 404 },
    { route: "/sitemap.xml", status: 200 },
    { route: "/robots.txt", status: 200 },
    { route: "/apple-touch-icon.png", status: 200 }
  ]) {
    test(`${status}, ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      if (!response) throw new Error("No response");

      // Check that pages get redirected properly
      expect(response.status()).toBe(status);
      expect(response.url().endsWith(expectedRoute || route)).toBe(true);
    });
  }
});
