<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Card from "$lib/components/Card.svelte";

  const { data } = $props();
  const { t } = $derived(data);
  const locale = $derived(t("common", "lang"));
</script>

<Seo
  seo={{
    title: data.kliniker?.seo?.title || data.kliniker?.seo_en?.title || t("kliniker", "title"),
    description:
      data.kliniker?.seo?.description ||
      data.kliniker?.seo_en?.description ||
      t("kliniker", "description"),
    link_photo: data.kliniker?.seo?.link_photo || data.kliniker?.seo_en?.link_photo,
  }} />

<Container>
  <Section>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        {data.kliniker?.title || data.kliniker?.title_en || t("kliniker", "title")}
      </h1>
      <p class="mx-auto max-w-3xl text-xl text-gray-600">
        {t("kliniker", "description")}
      </p>
    </div>

    <div class="mb-12">
      <h2 class="mb-6 text-center text-2xl font-semibold text-gray-900">
        {t("kliniker", "clinicsTitle")}
      </h2>
      <p class="mb-8 text-center text-gray-600">
        {t("kliniker", "clinicsDescription")}
      </p>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each data.klinikerList as clinic (clinic.slug)}
          <Card
            image={clinic.klinik_page?.omslagsbild}
            link="/{locale}/kliniker/{clinic.slug}"
            {t}
            text={locale === "sv"
              ? clinic.klinik_page?.description
              : clinic.klinik_page?.description_en || clinic.klinik_page?.description}>
            {locale === "sv"
              ? clinic.klinik_page?.title
              : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
          </Card>
        {/each}
      </div>
    </div>
  </Section>
</Container>
