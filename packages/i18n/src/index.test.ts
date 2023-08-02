import { describe, expect, it } from "vitest";
import { createTranslationLoader, createTranslator } from "./index";
import type { Config } from "./types";

type Files = "common" | "home";
type Locales = "en" | "sv";

const svTrans = {
  common: {
    hello: "hej"
  },
  home: {
    Welcome: "Välkommen {name} {surname}"
  }
};

const enTrans = {
  common: {
    hello: "hello"
  },
  home: {
    Welcome: "welcome {name}"
  }
};

const config = {
  loader: async (locale: Locales, file: Files) => {
    if (locale === "sv") return file === "common" ? svTrans.common : svTrans.home;
    return file === "common" ? enTrans.common : enTrans.home;
  }
} satisfies Config<Files, Locales>;

describe("translator", () => {
  const loader = createTranslationLoader(config);

  it("load translations and throw if fetching unloaded category", async () => {
    const translations = await loader.loadCategories(["common"], "sv");
    const t = createTranslator(translations);

    expect(t.t("common", "hello")).toBe("hej");
    expect(() => t.t("common", "hello2")).toThrowError();
    expect(() => t.t("home", "hello2")).toThrowError();
  });

  it("translate string with placeholder", async () => {
    const translations = await loader.loadCategories(["common", "home"], "sv");
    const t = createTranslator(translations);
    expect(t.t("home", "Welcome", { name: "Kajsa", surname: "Andersson" })).toBe(
      "Välkommen Kajsa Andersson"
    );
  });

  it("load multiple categories", async () => {
    const translations = await loader.loadCategories(["home", "common"], "sv");
    const t = createTranslator(translations);
    expect(t.t("common", "hello")).toBe("hej");
    expect(t.t("home", "Welcome", { name: "Kajsa", surname: "Andersson" })).toBe(
      "Välkommen Kajsa Andersson"
    );
  });
});
