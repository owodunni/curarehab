<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { article } = data;
</script>

<svelte:head>
  <title>{article.titel}</title>
  <meta name="description" content={article.sammanfattning} />
</svelte:head>

<Container class="pb-16">
  <article class="prose">
    {JSON.stringify(article.text)}
  </article>
</Container>
