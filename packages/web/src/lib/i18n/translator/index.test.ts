import { get } from "svelte/store";
import { beforeEach, describe, expect, it } from "vitest";
import { createTranslator } from "./index";
import type { Config, Translator } from "./types";

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
  let t: Translator<Files, Locales>;

  beforeEach(() => {
    t = createTranslator(config);
  });

  it("throw if fetching unloaded category", async () => {
    expect(() => get(t.t)("common", "hello")).toThrowError();
    await t.loadCategories(["common"], "sv");

    expect(get(t.t)("common", "hello")).toBe("hej");
    expect(() => get(t.t)("common", "hello2")).toThrowError();
  });

  it("change locale", async () => {
    await t.loadCategories(["common"], "sv");
    expect(get(t.t)("common", "hello")).toBe("hej");

    await t.loadCategories(["common"], "en");
    expect(get(t.t)("common", "hello")).toBe("hello");
  });

  it("translate string with placeholder", async () => {
    await t.loadCategories(["home"], "sv");
    expect(get(t.t)("home", "Welcome", { name: "Kajsa", surname: "Andersson" })).toBe(
      "Välkommen Kajsa Andersson"
    );
  });

  it("load multiple categories", async () => {
    await t.loadCategories(["home", "common"], "sv");
    expect(get(t.t)("common", "hello")).toBe("hej");
    expect(get(t.t)("home", "Welcome", { name: "Kajsa", surname: "Andersson" })).toBe(
      "Välkommen Kajsa Andersson"
    );
  });
});
