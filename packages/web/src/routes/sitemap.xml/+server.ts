import { PUBLIC_RUNTIME } from "$env/static/public";
import { defaultLocale, locales } from "$lib/i18n";
import type { RequestHandler } from "./$types";
import type { SlugsQuery } from "./$types.gql";
import query from "./query.gql?raw";

// TODO(#85): Re add articles to sitemap
const seUrls = [
  /*"/artiklar"*/
].flatMap((route) => {
  return `
      <url>
        <loc>https://curarehab.se${route}</loc>
      </url>`.trim();
});

const localPrefix = [...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}`), ""];

const urls = localPrefix.flatMap((locale) =>
  [
    "",
    "/om",
    "/terapeuter",
    "/behandlingar",
    // TODO(#85): Re add cookies and personuppgiftspolicy to sitemap
    "/hitta" /* "/cookies", "/personuppgiftspolicy" */
  ].map((route) => {
    return `
      <url>
        <loc>https://curarehab.se${locale}${route}</loc>
      </url>`.trim();
  })
);

const postUrls = (artiklar: SlugsQuery["artiklar"]) => {
  return artiklar.flatMap((a) =>
    `<url>
      <loc>https://curarehab.se${a.language === "en" ? "/en" : ""}/artiklar/${a.slug}</loc>
      <lastmod>${new Date(a.date_updated ?? a.date_created).toISOString().split("T")[0]}</lastmod>
    </url>`.trim()
  );
};

const terapheutsUrls = (terapheuts: SlugsQuery["terapeuter_directus_users"]): string[] => {
  return terapheuts.flatMap(({ directus_users_id }) =>
    localPrefix.flatMap((locale) =>
      `
    <url>
      <loc>https://curarehab.se${locale}/terapeuter/${directus_users_id?.slug}</loc>
    </url>`.trim()
    )
  );
};

const behandlingarUrls = (behandlingar: SlugsQuery["Behandlingar"]): string[] => {
  return behandlingar.flatMap(({ Slug }) =>
    localPrefix.flatMap((locale) =>
      `
    <url>
      <loc>https://curarehab.se${locale}/behandlingar/${Slug}</loc>
    </url>`.trim()
    )
  );
};

export const GET: RequestHandler = async (event) => {
  const data = await event.locals.client
    .query<SlugsQuery>(query, {
      filter: { ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } }) },
      f2: { ...(PUBLIC_RUNTIME === "production" && { status: { _eq: "published" } }) }
    })
    .toPromise();

  const { artiklar, terapeuter_directus_users, Behandlingar } = data.data ?? {};

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
      ${postUrls(artiklar || [])}
      ${terapheutsUrls(terapeuter_directus_users || [])
        .join("\n")
        .trim()}
      ${behandlingarUrls(Behandlingar || [])
        .join("\n")
        .trim()}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
};
