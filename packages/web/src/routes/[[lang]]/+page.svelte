<script lang="ts">
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Treatments from "$lib/widgets/Treatments.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { PageData } from "./$types";
  import Container from "$lib/components/Container.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  import Behandling from "./behandling.svelte";
  import Banner from "$lib/components/Banner.svelte";
  import HeroNew from "$lib/components/HeroNew.svelte";
  import Clinics from "$lib/widgets/Clinics.svelte";
  import { userToImageType } from "$lib/components/util";
  import { userGuard } from "$lib/components/types";

  const { data }: { data: PageData } = $props();
  const { t, l, localized } = $derived(data);
  const terapeuter = $derived(data?.data?.terapeuter?.terapeuter?.filter(userGuard) || []);

  const users = $derived(userToImageType(terapeuter, t, l));
</script>

{#if data.params.lang !== "en" && data?.data?.header?.banner}
  <Banner banner={data?.data?.header?.banner} />
{/if}

<div class="theme-skog !py-0">
  <HeroNew image={data?.data?.Hem?.omslagsbild || undefined} {l} {t} />
</div>
<Section extras="theme-skog">
  <Clinics
    description={localized(data.kliniker?.description, data.kliniker?.description_en) || ""}
    images={users}
    klinikerList={data.klinikerList}
    {l}
    {localized}
    {t}
    title={localized(data.kliniker?.title, data.kliniker?.title_en) || ""} />
</Section>
<Section extras="theme-sand-dark">
  <Container>
    <Terapheuts {l} {t} terapheuts={terapeuter} />
  </Container>
</Section>
<Section extras="theme-skog">
  <Container>
    <Behandling {t} />
  </Container>
</Section>
<Section extras="theme-sand-dark">
  <Container>
    <Treatments {l} {t} treatments={data?.data?.Behandlingar || []} />
  </Container>
</Section>
{#if data?.data?.Hem?.artiklar?.length || 0 > 0}
  <Section extras="theme-skog">
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
