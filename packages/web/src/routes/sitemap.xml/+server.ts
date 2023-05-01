import { defaultLocale, locales } from "$lib/i18n";
import type { BlogPostMetaData, DbError } from "@curarehab/api";
import type { RequestHandler } from "./$types";

const urls = [...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}`), ""].flatMap(
  (locale) =>
    ["", "/om", "/blog"].map((route) => {
      return `
      <url>
        <loc>https://curarehab.se${locale}${route}</loc>
      </url>`.trim();
    })
);

const postUrls = (posts: BlogPostMetaData[]) => {
  return posts.flatMap((post) => {
    return `
    <url>
      <loc>https://curarehab.se/${post.locale === "sv" ? "" : `${post.locale}/`}blog/${
      post.slug
    }</loc>
      <lastmod>${new Date(post.updated_at).toISOString().split("T")[0]}</lastmod>
    </url>`.trim();
  });
};

export const GET: RequestHandler = async (event) => {
  const posts = await (async (): Promise<BlogPostMetaData[]> => {
    const posts = (await (await event.fetch("/api/blog")).json()) as DbError | BlogPostMetaData[];
    return "code" in posts ? [] : posts;
  })();

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
      ${postUrls(posts)}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
};
