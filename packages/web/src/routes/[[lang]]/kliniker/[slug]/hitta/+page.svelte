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
      t("kliniker", "hittaTitle") +
      " - " +
      (locale === "sv"
        ? clinic.klinik_page?.title
        : clinic.klinik_page?.title_en || clinic.klinik_page?.title),
    description: t("kliniker", "hittaDescription"),
  }} />

<Container>
  <Section>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        {t("kliniker", "hittaTitle")}
      </h1>
      <h2 class="mb-4 text-2xl text-gray-600">
        {locale === "sv"
          ? clinic.klinik_page?.title
          : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
      </h2>
      <p class="mx-auto max-w-3xl text-xl text-gray-600">
        {t("kliniker", "hittaDescription")}
      </p>
    </div>

    <div class="mx-auto max-w-4xl">
      {#if clinic.hitta?.omslagsbild}
        <div class="mb-8">
          <Image
            class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
            alt={clinic.hitta?.omslagsbild?.title ||
              clinic.klinik_page?.title ||
              clinic.klinik_page?.title_en ||
              ""}
            height={450}
            srcPath={clinic.hitta?.omslagsbild?.filename_disk || ""}
            width={800} />
        </div>
      {/if}

      <div class="prose prose-lg max-w-none">
        <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <h3 class="mb-6 text-2xl font-semibold">Hitta hit</h3>
          <div class="space-y-4 text-gray-700">
            <p>
              {locale === "sv"
                ? clinic.hitta?.description
                : clinic.hitta?.description_en || clinic.hitta?.description}
            </p>
            <p>
              Vi ligger centralt beläget med goda kommunikationer. Här hittar du all information du
              behöver för att ta dig till oss.
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Adress</h4>
            <div class="space-y-2 text-gray-700">
              <p><strong>Besöksadress:</strong></p>
              <p>Placeholder Address</p>
              <p>Linköping</p>
              <p><strong>Telefon:</strong> 013-12 13 14</p>
              <p><strong>E-post:</strong> info@curarehab.se</p>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Kollektivtrafik</h4>
            <div class="space-y-2 text-gray-700">
              <p><strong>Buss:</strong> Linje 1, 2, 3</p>
              <p><strong>Hållplats:</strong> Centralstationen</p>
              <p><strong>Gångavstånd:</strong> 5 minuter</p>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Parkering</h4>
            <div class="space-y-2 text-gray-700">
              <p>Begränsad gatuparkering finns tillgänglig.</p>
              <p>Närliggande parkeringsgarage: P-hus City</p>
              <p>Avgift: 20 kr/timme</p>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Öppettider</h4>
            <div class="space-y-2 text-gray-700">
              <p><strong>Måndag-Fredag:</strong> 07:00-19:00</p>
              <p><strong>Lördag:</strong> 08:00-15:00</p>
              <p><strong>Söndag:</strong> Stängt</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <a
          class="text-blue-600 transition-colors hover:text-blue-800"
          href="/{locale}/kliniker/{clinic.slug}">
          ← Tillbaka till {locale === "sv"
            ? clinic.klinik_page?.title
            : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
        </a>
      </div>
    </div>
  </Section>
</Container>
