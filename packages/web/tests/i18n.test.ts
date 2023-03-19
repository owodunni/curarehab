import { expect, test } from "@playwright/test";
import { hem as svHem, om as svOm } from "$lib/i18n/sv/index";
import { hem as enHem, om as enOm } from "$lib/i18n/en/index";

test.describe("Test locale, SEO, status and redirects", () => {
  for (const { route, expectedRoute, data, status } of [
    { route: "/", data: svHem, status: 200 },
    { route: "/sv", expectedRoute: "/", data: svHem, status: 200 },
    { route: "/en", data: enHem, status: 200 },
    { route: "/om", data: svOm, status: 200 },
    { route: "/sv/om", expectedRoute: "/om", data: svOm, status: 200 },
    { route: "/en/om", data: enOm, status: 200 },
    { route: "/no", status: 404 },
    { route: "/sitemap.xml", status: 200 },
    { route: "/robots.txt", status: 404 }
  ]) {
    test(`${status}, ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      if (!response) throw new Error("No response");

      // Check that pages get redirected properly
      expect(response.status()).toBe(status);
      expect(response.url().endsWith(expectedRoute || route)).toBe(true);

      if (!data) return;
      const { title, description } = data;
      expect(await page.title()).toBe(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        description
      );
    });
  }
});
