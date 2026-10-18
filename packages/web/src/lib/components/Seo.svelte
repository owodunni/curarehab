<script lang="ts">
  import { page } from "$app/state";
  import type { SeoMetaData } from "$lib/api";
  import { getAsset2 } from "$lib/widgets/util";
  import { organization, origin } from "$lib/constants";
  import type { MedicalClinic, NewsArticle, WebPage, WithContext } from "schema-dts";

  type LdJson = WithContext<WebPage> | WithContext<NewsArticle> | WithContext<MedicalClinic>;

  const {
    seo,
    ldJson = undefined,
  }: {
    seo: SeoMetaData | null | undefined;
    ldJson?: LdJson | null | undefined;
  } = $props();

  // Articles and skadekompassen only exist in one language, so they get no hreflang alternates.
  const hasTranslation = $derived(
    !page.url.pathname.replace(/^\/en(?=\/|$)/, "").match(/^\/(artiklar|skadekompassen)(\/|$)/)
  );

  const svPath = $derived(page.url.pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, ""));
  const canonical = $derived(`${origin}${page.url.pathname.replace(/\/$/, "")}`);
  const alternates = $derived(
    hasTranslation
      ? [
          { hreflang: "sv", href: `${origin}${svPath}` },
          { hreflang: "en", href: `${origin}/en${svPath}` },
          { hreflang: "x-default", href: `${origin}${svPath}` },
        ]
      : []
  );

  // Computed with $derived rather than $effect so that it is part of the prerendered HTML.
  const computedLdJson = $derived.by((): LdJson | null | undefined => {
    if (ldJson || !seo) {
      return ldJson;
    }
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      ...(seo.title && { name: seo.title }),
      ...(seo.description && { description: seo.description }),
      ...(seo.link_photo &&
        seo.link_photo.filename_disk && {
          image: {
            "@type": "ImageObject",
            url: getAsset2(seo.link_photo.filename_disk, {
              width: 800,
              height: 450,
              format: "jpg",
              quality: 80,
            }),
            width: "800",
            height: "450",
          },
        }),
      publisher: organization,
    };
  });
</script>

<svelte:head>
  <link href={canonical} rel="canonical" />
  {#each alternates as alternate (alternate.hreflang)}
    <link href={alternate.href} hreflang={alternate.hreflang} rel="alternate" />
  {/each}
  {#if seo}
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta content={seo.title} property="og:title" />
    <meta content={seo.description} property="og:description" />
    {#if seo.link_photo && seo.link_photo.filename_disk}
      <meta
        content={getAsset2(seo.link_photo.filename_disk, {
          width: 1200,
          height: 627,
          quality: 0.8,
          format: "png",
        })}
        property="og:image" />
      <meta content="1200" property="og:image:width" />
      <meta content="627" property="og:image:height" />
      <meta content={seo.link_photo.title} property="og:image:alt" />
    {/if}
  {/if}
  {#if computedLdJson}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script type="application/ld+json">${JSON.stringify(computedLdJson)}${"</"}script>`}
  {/if}
</svelte:head>
