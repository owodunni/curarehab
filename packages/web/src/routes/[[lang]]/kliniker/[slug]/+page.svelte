<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import HeroComponent from "$lib/components/HeroComponent.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";

  const { data } = $props();
  const { t, localized, l } = $derived(data);
  const { clinic, slug } = $derived(data);
</script>

<Seo seo={localized(clinic?.seo, clinic?.seo_en)} />

<!-- Hero Section -->
<HeroComponent image={clinic?.omslagsbild || undefined}>
  <div class="mx-auto max-w-2xl lg:mx-0">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <Breadcrumb
        items={[
          {
            title: localized(clinic?.title, clinic?.title_en) || "",
            current: true,
          },
        ]}
        {l}
        {t} />
    </div>

    <h1 class="text-theme-heading text-4xl font-bold tracking-tight sm:text-6xl">
      {localized(clinic?.title, clinic?.title_en) || t("kliniker", "heroTitle")}
    </h1>
    <p class="text-theme-body mt-6 text-lg leading-8">
      {t("kliniker", "heroSubtitle")}
    </p>
    <div class="mt-8 flex items-center gap-x-6">
      <a class="btn variant-filled" href={`${l("kliniker")}/${slug}/boka`}
        >{t("kliniker", "heroBookButton")}</a>
      <a class="btn variant-filled bg-skog-700" href={`${l("kliniker")}/${slug}/hitta`}
        >{t("kliniker", "hittaTitle")}</a>
      <a class="btn variant-ghost" href={`${l("kliniker")}/${slug}/om`}
        >{t("kliniker", "aboutTitle")} <span aria-hidden="true">→</span></a>
    </div>
  </div>
</HeroComponent>

<Container>
  <Section>
    <!-- Clinic Description -->
    {#if clinic?.text || clinic?.text_en}
      <div class="mx-auto max-w-4xl">
        <div class="prose prose-lg text-theme-body mx-auto">
          <BlocksRender blocks={localized(clinic.text, clinic.text_en)?.blocks || []} />
        </div>
      </div>
    {/if}
  </Section>
</Container>
<Section extras="theme-skog">
  <Container>
    <Terapheuts {l} {t} terapheuts={data?.data?.terapeuter_directus_users || []} />
  </Container>
</Section>
