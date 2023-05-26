import { defaultLocale, locales } from "$lib/i18n";
import type { BlogPostMetaData, DbError, TerapheutMetaData } from "@curarehab/api";
import type { RequestHandler } from "./$types";

const seUrls = ["/artiklar"].flatMap((route) => {
  return `
      <url>
        <loc>https://curarehab.se${route}</loc>
      </url>`.trim();
});

const localPrefix = [...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}`), ""];

const urls = localPrefix.flatMap((locale) =>
  ["", "/om", "/terapeuter"].map((route) => {
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
      <loc>https://curarehab.se/${post.locale === "sv" ? "" : `${post.locale}/`}artiklar/${
      post.slug
    }</loc>
      <lastmod>${new Date(post.updated_at).toISOString().split("T")[0]}</lastmod>
    </url>`.trim();
  });
};

const terapheutsUrls = (terapheuts: TerapheutMetaData[]): string[] => {
  return terapheuts.flatMap((t) =>
    localPrefix.flatMap((locale) => {
      return `
    <url>
      <loc>https://curarehab.se${locale}/terapeuter/${t.first_name}-${t.id}</loc>
    </url>`.trim();
    })
  );
};

export const GET: RequestHandler = async (event) => {
  const [posts, terapheuts] = await Promise.all([
    (async (): Promise<BlogPostMetaData[]> => {
      const posts = (await (await event.fetch("/api/artiklar")).json()) as
        | DbError
        | BlogPostMetaData[];
      return "code" in posts ? [] : posts;
    })(),
    (async (): Promise<TerapheutMetaData[]> => {
      const terapheuts = (await (await event.fetch("/api/terapeuter")).json()) as
        | DbError
        | TerapheutMetaData[];
      return "code" in terapheuts ? [] : terapheuts;
    })()
  ]);

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
      ${seUrls.join("\n")}
      ${urls.join("\n")}
      ${postUrls(posts)}
      ${terapheutsUrls(terapheuts)}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
};
