import { locales } from "$lib/i18n";

const urls = [...locales.map((l) => `/${l}`), ""].flatMap((locale) =>
  ["", "/about"].map((route) => {
    return `
      <url>
        <loc>https://curarehab.se${locale}${route}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`.trim();
  })
);

export async function GET() {
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${urls.join("\n")}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
}
