<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { l, t } = data;
</script>

<Container>
  <Articles articles={data?.data?.artiklar || []} {l} {t} />
</Container>

<svelte:head>
  <title>{data.t("artiklar", "title")}</title>
  <meta name="description" content={data.t("artiklar", "description")} />
</svelte:head>
