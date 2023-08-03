<script lang="ts">
  import type { SeoMetaData } from "$lib/api";
  import { getAsset2 } from "$lib/widgets/util";

  export let seo: SeoMetaData | null | undefined;
</script>

<svelte:head>
  {#if seo}
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    {#if seo.image && seo.image.filename_disk}
      <meta
        property="og:image"
        content={getAsset2(seo.image.filename_disk, {
          width: 1200,
          height: 627,
          quality: 0.8,
          format: "png"
        })}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:alt" content={seo.image.title} />
    {/if}
  {/if}
</svelte:head>
