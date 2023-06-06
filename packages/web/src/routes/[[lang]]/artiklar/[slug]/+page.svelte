<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { article } = data;
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.sammanfattning} />
</svelte:head>

<Container class="pb-16">
  <article class="prose">
    <BlocksRender blocks={article.artikel?.blocks || []} />
  </article>
</Container>
