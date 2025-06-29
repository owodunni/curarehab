<script lang="ts">
  import type { SeoMetaData } from "$lib/api";
  import { getAsset2 } from "$lib/widgets/util";
  import type { NewsArticle, WebPage, WithContext } from "schema-dts";

  const {
    seo,
    ldJson = undefined,
  }: {
    seo: SeoMetaData | null | undefined;
    ldJson?: WithContext<WebPage> | WithContext<NewsArticle> | null | undefined;
  } = $props();

  let computedLdJson = $state<WithContext<WebPage> | WithContext<NewsArticle> | null | undefined>(
    ldJson
  );

  $effect(() => {
    if (!ldJson && seo) {
      computedLdJson = {
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
        publisher: {
          "@type": "Organization",
          url: "https://curarehab.se",
          email: "info@curarehab.se",
          name: "CuraRehab",
          legalName: "CuraRehab Linköping AB",
        },
      };
    } else {
      computedLdJson = ldJson;
    }
  });
</script>

<svelte:head>
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
