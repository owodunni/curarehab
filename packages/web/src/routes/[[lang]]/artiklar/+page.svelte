<script lang="ts">
  import { ArticleList } from "$lib/components/ArticleList";
  import Container from "$lib/components/Container.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<Container>
  <header class="max-w-2xl">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      {data.t("artiklar", "description")}
    </h1>
  </header>
  <div class="py-16">
    <ArticleList posts={data.posts} t={data.t} l={data.l} />
  </div>
</Container>

<svelte:head>
  <title>{data.t("artiklar", "title")}</title>
  <meta name="description" content={data.t("artiklar", "description")} />
</svelte:head>
