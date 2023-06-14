<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ l, t } = data);
</script>

<Section>
  <Container>
    <Articles articles={data?.data?.artiklar || []} {l} {t} />
  </Container>
</Section>

<svelte:head>
  <title>{data.t("artiklar", "title")}</title>
  <meta name="description" content={data.t("artiklar", "description")} />
</svelte:head>
