<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
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

<Seo seo={data.params.lang === "en" ? data?.data?.Artiklar?.seo_en : data?.data?.Artiklar?.seo} />
