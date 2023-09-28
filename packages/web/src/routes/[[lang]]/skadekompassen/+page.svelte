<script lang="ts">
  import type { Article } from "$lib/api";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({ l, t } = data);
  $: artiklar = (data?.data?.skadekompassen?.artiklar?.map((i) => i?.artiklar_id).filter(Boolean) ??
    []) as (Article | null)[];
</script>

<Section>
  <Container>
    <Articles articles={artiklar} {l} {t}>
      <h1 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("common", "skadekompassenTitle")}
      </h1>
      <p class="text-theme-heading mt-6 text-lg">
        {t("common", "skadekompassenText")}
      </p>
    </Articles>
  </Container>
</Section>

<Seo seo={data?.data?.skadekompassen?.seo} />
