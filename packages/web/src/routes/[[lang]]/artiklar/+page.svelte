<script lang="ts">
  import { t } from "$lib/i18n";
  import { ArticleList } from "$lib/components/ArticleList";
  import type { PageData } from "./$types";
  import { Container } from "$lib/components";
  export let data: PageData;
</script>

<Container>
  <header class="max-w-2xl">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{$t("artiklar", "description")}</h1>
  </header>
  <div class="py-16">
    <ArticleList posts={data.posts} />
  </div>
</Container>

<svelte:head>
  <title>{$t("artiklar", "title")}</title>
  <meta name="description" content={$t("artiklar", "description")} />
</svelte:head>
