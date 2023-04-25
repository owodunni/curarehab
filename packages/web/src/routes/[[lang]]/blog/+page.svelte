<script lang="ts">
  import { t } from "$lib/i18n";
  import { BlogList } from "$lib/components/BlogList";
  import type { PageData } from "./$types";
  import { Container } from "$lib/components";
  export let data: PageData;
</script>

<Container>
  <BlogList posts={data.posts} />
</Container>

<svelte:head>
  <title>{$t("blog", "title")}</title>
  <meta name="description" content={$t("blog", "description")} />
</svelte:head>
