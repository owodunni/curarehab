<script lang="ts">
  import type { SeoMetaData } from "$lib/api";
  import { getAsset2 } from "$lib/widgets/util";
  import type { NewsArticle, WebPage, WithContext } from "schema-dts";

  export let seo: SeoMetaData | null | undefined;
  export let ldJson: WithContext<WebPage> | WithContext<NewsArticle> | null | undefined = undefined;
  $: if (!ldJson && seo) {
    ldJson = {
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
              quality: 80
            }),
            width: "800",
            height: "450"
          }
        }),
      publisher: {
        "@type": "Organization",
        url: "https://curarehab.se",
        email: "info@curarehab.se",
        name: "CuraRehab",
        legalName: "CuraRehab Linköping AB"
      }
    };
  }
</script>

<svelte:head>
  {#if seo}
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    {#if seo.link_photo && seo.link_photo.filename_disk}
      <meta
        property="og:image"
        content={getAsset2(seo.link_photo.filename_disk, {
          width: 1200,
          height: 627,
          quality: 0.8,
          format: "png"
        })}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:alt" content={seo.link_photo.title} />
    {/if}
  {/if}
  {#if ldJson}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script type="application/ld+json">${JSON.stringify(ldJson)}${"</"}script>`}
  {/if}
</svelte:head>
