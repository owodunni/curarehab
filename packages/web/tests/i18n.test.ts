import { expect, test } from "@playwright/test";
import { home as svHome, about as svAbout } from "$lib/i18n/sv/index";
import { home as enHome, about as enAbout } from "$lib/i18n/en/index";

test.describe("Check that pages are localized and have SEO headers", () => {
  for (const {
    route,
    data: { title, description }
  } of [
    { route: "/", data: enHome },
    { route: "/sv", data: svHome },
    { route: "/en", data: enHome },
    { route: "/about", data: enAbout },
    { route: "/sv/about", data: svAbout },
    { route: "/en/about", data: enAbout }
  ]) {
    test(`${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
      expect(await page.title()).toBe(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        description
      );
    });
  }
});
