<script lang="ts">
  import Articles from "$lib/widgets/Articles.svelte";
  import Hero from "$lib/widgets/Hero.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { PageData } from "./$types";
  import Container from "$lib/components/Container.svelte";
  import Seo from "$lib/components/Seo.svelte";

  export let data: PageData;
  $: ({ t, l } = data);
</script>

<Section class="py-20 sm:py-32 lg:py-0 lg:pb-32 xl:pb-36">
  <Hero {t} {l} image={data?.data?.Hem?.omslagsbild ?? undefined} />
</Section>
<Section extras="bg-skog-700">
  <Container>
    <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} {l} {t} />
  </Container>
</Section>
<Section>
  <Container>
    <Articles articles={data?.data?.artiklar || []} {l} {t} />
  </Container>
</Section>
<Seo seo={data.params.lang === "en" ? data?.data?.Hem?.seo_en : data?.data?.Hem?.seo} />
