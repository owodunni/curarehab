<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import type { PageData } from "./$types";
  const { data }: { data: PageData } = $props();
  const { l, t } = $derived(data);
</script>

<Section>
  <Container>
    <Articles articles={data?.data?.artiklar || []} {l} {t}>
      <h1 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("artiklar", "articlesTitle")}
      </h1>
    </Articles>
  </Container>
</Section>

<Seo seo={data.params.lang === "en" ? data?.data?.Artiklar?.seo_en : data?.data?.Artiklar?.seo} />
