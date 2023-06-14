<script lang="ts">
  import type { SeoMetaData } from "$lib/api";

  export let seo: SeoMetaData | null | undefined;
</script>

<svelte:head>
  {#if seo}
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
  {/if}
</svelte:head>
