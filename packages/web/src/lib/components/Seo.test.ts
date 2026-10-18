import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import Seo from "./Seo.svelte";

const mockPage = vi.hoisted(() => ({ url: { pathname: "/" } }));

vi.mock("$app/state", () => ({
  page: mockPage,
}));

vi.mock("$lib/widgets/util", () => ({
  getAsset2: vi.fn((srcPath: string) => `https://example.com/image/${srcPath}`),
}));

const seo = { title: "Naprapat i Linköping", description: "Beskrivning" };

const links = (rel: string) =>
  Array.from(document.head.querySelectorAll(`link[rel="${rel}"]`)).map((link) => ({
    href: link.getAttribute("href"),
    hreflang: link.getAttribute("hreflang"),
  }));

const ldJson = () =>
  JSON.parse(document.head.querySelector('script[type="application/ld+json"]')?.textContent || "");

describe("Seo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("renders canonical and hreflang alternates for a swedish page", () => {
    mockPage.url.pathname = "/behandlingar/naprapatbehandling";
    render(Seo, { seo });

    expect(links("canonical")).toEqual([
      { href: "https://curarehab.se/behandlingar/naprapatbehandling", hreflang: null },
    ]);
    expect(links("alternate")).toEqual([
      { href: "https://curarehab.se/behandlingar/naprapatbehandling", hreflang: "sv" },
      { href: "https://curarehab.se/en/behandlingar/naprapatbehandling", hreflang: "en" },
      { href: "https://curarehab.se/behandlingar/naprapatbehandling", hreflang: "x-default" },
    ]);
  });

  it("renders canonical and hreflang alternates for the english start page", () => {
    mockPage.url.pathname = "/en";
    render(Seo, { seo });

    expect(links("canonical")).toEqual([{ href: "https://curarehab.se/en", hreflang: null }]);
    expect(links("alternate")).toEqual([
      { href: "https://curarehab.se", hreflang: "sv" },
      { href: "https://curarehab.se/en", hreflang: "en" },
      { href: "https://curarehab.se", hreflang: "x-default" },
    ]);
  });

  it("does not render hreflang alternates for articles", () => {
    mockPage.url.pathname = "/artiklar/ont-i-ryggen";
    render(Seo, { seo });

    expect(links("canonical")).toEqual([
      { href: "https://curarehab.se/artiklar/ont-i-ryggen", hreflang: null },
    ]);
    expect(links("alternate")).toEqual([]);
  });

  it("renders the default WebPage structured data", () => {
    mockPage.url.pathname = "/";
    render(Seo, { seo });

    expect(ldJson()).toMatchObject({ "@type": "WebPage", name: seo.title });
  });

  it("renders the given structured data", () => {
    mockPage.url.pathname = "/kliniker/city";
    render(Seo, {
      seo,
      ldJson: {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        name: "CuraRehab City",
      },
    });

    expect(ldJson()).toMatchObject({ "@type": "MedicalClinic", name: "CuraRehab City" });
  });
});
