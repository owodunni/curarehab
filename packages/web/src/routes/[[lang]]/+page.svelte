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
  import Banner from "$lib/components/Banner.svelte";

  const { data }: { data: PageData } = $props();
  const { t, l } = $derived(data);
</script>

{#if data.params.lang !== "en" && data?.data?.header?.banner}
  <Banner banner={data?.data?.header?.banner} />
{/if}

<Section extras="theme-sand-dark lg:pt-8">
  <Hero image={data?.data?.Hem?.omslagsbild ?? undefined} {l} {t} />
</Section>
<Section extras="theme-skog">
  <Container>
    <Terapheuts {l} {t} terapheuts={data?.data?.terapeuter_directus_users || []} />
  </Container>
</Section>
<Section extras="theme-sand-dark">
  <Container>
    <Behandling {t} />
  </Container>
</Section>
<Section extras="theme-skog">
  <Container>
    <Treatments {l} {t} treatments={data?.data?.Behandlingar || []} />
  </Container>
</Section>
{#if data?.data?.Hem?.artiklar?.length || 0 > 0}
  <Section extras="theme-sand-dark">
    <Container>
      <Articles articles={data?.data?.Hem?.artiklar || []} {l} {t}>
        <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("common", "skadekompassenTitle")}
        </h2>
        <p class="text-theme-heading mt-6 text-lg">
          {t("common", "skadekompassenText")}
          <a class="font-normal hover:font-medium" href={l("skadekompassen")}
            >{t("hem", "readMore")} <span aria-hidden="true">→</span></a>
        </p>
      </Articles>
    </Container>
  </Section>
{/if}
<Seo seo={data.params.lang === "en" ? data?.data?.Hem?.seo_en : data?.data?.Hem?.seo} />
