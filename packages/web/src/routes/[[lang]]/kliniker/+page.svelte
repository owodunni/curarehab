<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import ClinicList from "$lib/components/ClinicList.svelte";

  const { data } = $props();
  const { t, l } = $derived(data);
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

    <ClinicList
      clinics={data.klinikerList}
      description={t("kliniker", "clinicsDescription")}
      {l}
      {t}
      title={t("kliniker", "clinicsTitle")} />
  </Section>
</Container>
