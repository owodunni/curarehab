<script lang="ts">
  import { t } from "$lib/i18n";
  import { BlogList } from "$lib/components/BlogList";
  import type { PageData } from "./$types";
  import { Container } from "$lib/components";
  export let data: PageData;
</script>

<Container>
  <header class="max-w-2xl">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{$t("blog", "description")}</h1>
  </header>
  <div class="py-16">
    <BlogList posts={data.posts} />
  </div>
</Container>

<svelte:head>
  <title>{$t("blog", "title")}</title>
  <meta name="description" content={$t("blog", "description")} />
</svelte:head>
