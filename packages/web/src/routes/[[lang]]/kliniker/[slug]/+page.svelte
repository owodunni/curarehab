<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";

  const { data } = $props();
  const { t } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const clinic = $derived(data.clinic);
</script>

<Seo
  seo={{
    title:
      locale === "sv"
        ? clinic.klinik_page?.title
        : clinic.klinik_page?.title_en || clinic.klinik_page?.title,
    description:
      locale === "sv"
        ? clinic.klinik_page?.description
        : clinic.klinik_page?.description_en || clinic.klinik_page?.description,
  }} />

<Container>
  <Section>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        {locale === "sv"
          ? clinic.klinik_page?.title
          : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
      </h1>
      <p class="mx-auto max-w-3xl text-xl text-gray-600">
        {locale === "sv"
          ? clinic.klinik_page?.description
          : clinic.klinik_page?.description_en || clinic.klinik_page?.description}
      </p>
    </div>

    {#if clinic.klinik_page?.omslagsbild}
      <div class="mb-12">
        <Image
          class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
          alt={clinic.klinik_page?.omslagsbild?.title || clinic.klinik_page?.title || ""}
          height={450}
          srcPath={clinic.klinik_page?.omslagsbild?.filename_disk || ""}
          width={800} />
      </div>
    {/if}

    <div class="grid gap-8 md:grid-cols-3">
      <!-- Boka tid -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-900">
          {t("kliniker", "bokaTitle")}
        </h2>
        <p class="mb-4 text-gray-600">
          {t("kliniker", "bokaDescription")}
        </p>
        <a
          class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          href="/{locale}/kliniker/{clinic.slug}/boka">
          {t("kliniker", "bokaTitle")}
        </a>
      </div>

      <!-- Hitta hit -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-900">
          {t("kliniker", "hittaTitle")}
        </h2>
        <p class="mb-4 text-gray-600">
          {t("kliniker", "hittaDescription")}
        </p>
        <a
          class="inline-block rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          href="/{locale}/kliniker/{clinic.slug}/hitta">
          {t("kliniker", "hittaTitle")}
        </a>
      </div>

      <!-- Om kliniken -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <h2 class="mb-4 text-2xl font-semibold text-gray-900">
          {t("kliniker", "omTitle")}
        </h2>
        <p class="mb-4 text-gray-600">
          {t("kliniker", "omDescription")}
        </p>
        <a
          class="inline-block rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
          href="/{locale}/kliniker/{clinic.slug}/om">
          {t("kliniker", "omTitle")}
        </a>
      </div>
    </div>

    <div class="mt-12 text-center">
      <a class="text-blue-600 transition-colors hover:text-blue-800" href="/{locale}/kliniker">
        ← {t("kliniker", "title")}
      </a>
    </div>
  </Section>
</Container>
