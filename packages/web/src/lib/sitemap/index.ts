import type { Client } from "@urql/core";
import type { SlugsQuery } from "./$types.gql";

export const locales = ["en", "sv"];
export const defaultLocale = "sv";

const toString = (d: Date) => d.toISOString().split("T")[0];

const createUrl = (
  route: string,
  lastmod?: string | { date_updated?: string; date_created?: string } | { date_updated?: string }
) => {
  let l: string | undefined = undefined;
  if (lastmod) {
    if (typeof lastmod === "string") l = lastmod;
    else if (lastmod.date_updated) l = toString(new Date(lastmod.date_updated));
    else if ("date_created" in lastmod && lastmod.date_created)
      l = toString(new Date(lastmod.date_created));
  }
  return `
      <url>
        <loc>https://curarehab.se${route}</loc>
        ${l ? `<lastmod>${l}</lastmod>` : ""}
      </url>`.trim();
};

// TODO(#85): Re add articles to sitemap
const seUrls = [
  /*"/artiklar"*/
].flatMap((route) => createUrl(route));

const localPrefix = [...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}`), ""];

const urls = (data: SlugsQuery) =>
  localPrefix.flatMap((locale) =>
    [
      ["", data.Hem],
      ["/om", data.om],
      ["/om/personuppgiftspolicy", data.sekretess],
      ["/om/cookies", data.cookies],
      ["/terapeuter", data.Terapeuter],
      ["/hitta", data.hitta]
    ].map(([route, lastmod]) => createUrl(locale + route, lastmod ?? undefined))
  );

// TODO: (#85) Use date_updated for articles
const postUrls = (artiklar: SlugsQuery["artiklar"]) =>
  artiklar.flatMap((a) => createUrl(`${a.language === "en" ? "/en" : ""}/artiklar/${a.slug}`, a));

// TODO(#165): Change datastructure of terapeuter to get date_updated
const terapheutsUrls = (terapheuts: SlugsQuery["terapeuter_directus_users"]): string[] => {
  return terapheuts.flatMap(({ directus_users_id }) =>
    localPrefix.flatMap((locale) => createUrl(`${locale}/terapeuter/${directus_users_id?.slug}`))
  );
};

const behandlingarUrls = (
  behandlingar: SlugsQuery["Behandlingar"],
  dateUpdated?: string
): string => {
  let latestDate: Date | undefined = dateUpdated ? new Date(dateUpdated) : undefined;

  const b = behandlingar.flatMap(({ Slug, date_updated, date_created }) =>
    localPrefix.flatMap((locale) => {
      const date = new Date(date_updated ?? date_created);
      if (!latestDate || date > latestDate) latestDate = date;
      return createUrl(`${locale}/behandlingar/${Slug}`, toString(date));
    })
  );

  return `
${b}
${createUrl("/behandlingar", latestDate ? toString(latestDate) : undefined)}
`.trim();
};

export const createSitemap = async (client: Client, query: string) => {
  const data = await client
    .query<SlugsQuery>(query, {
      filter: { status: { _eq: "published" } },
      f2: { status: { _eq: "published" } }
    })
    .toPromise();

  if (data.data === undefined) throw new Error("No graphql data",data.error);

  const { artiklar, terapeuter_directus_users, Behandlingar } = data.data;

  return `
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
      ${urls(data.data).join("\n")}
      ${postUrls(artiklar || [])}
      ${terapheutsUrls(terapeuter_directus_users || [])
        .join("\n")
        .trim()}
      ${behandlingarUrls(Behandlingar || [], data.data.behandlingar?.date_updated).trim()}
    </urlset>`.trim();
};
