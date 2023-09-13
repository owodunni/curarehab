<script lang="ts">
  import Hero from "$lib/widgets/Hero.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Treatments from "$lib/widgets/Treatments.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { PageData } from "./$types";
  import Container from "$lib/components/Container.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import Behandling from "./behandling.svelte";

  export let data: PageData;
  $: ({ t, l } = data);
</script>

<Section extras="theme-sand-dark lg:pt-8">
  <Hero {t} {l} image={data?.data?.Hem?.omslagsbild ?? undefined} />
</Section>
<Section extras="theme-skog">
  <Container>
    <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} {l} {t} />
  </Container>
</Section>
<Section extras="theme-sand-dark">
  <Container>
    <Behandling />
  </Container>
</Section>
<Section extras="theme-skog">
  <Container>
    <Treatments treatments={data?.data?.Behandlingar || []} {l} {t} />
  </Container>
</Section>
<Section extras="theme-sand-dark">
  <Container>
    <Articles articles={data?.data?.Hem?.artiklar || []} {l} {t} />
  </Container>
</Section>
<Seo seo={data.params.lang === "en" ? data?.data?.Hem?.seo_en : data?.data?.Hem?.seo} />
