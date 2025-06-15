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
      t("kliniker", "bokaTitle") +
      " - " +
      (locale === "sv"
        ? clinic.klinik_page?.title
        : clinic.klinik_page?.title_en || clinic.klinik_page?.title),
    description: t("kliniker", "bokaDescription"),
  }} />

<Container>
  <Section>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        {t("kliniker", "bokaTitle")}
      </h1>
      <h2 class="mb-4 text-2xl text-gray-600">
        {locale === "sv"
          ? clinic.klinik_page?.title
          : clinic.klinik_page?.title_en || clinic.klinik_page?.title}
      </h2>
      <p class="mx-auto max-w-3xl text-xl text-gray-600">
        {t("kliniker", "bokaDescription")}
      </p>
    </div>

    <div class="mx-auto max-w-4xl">
      {#if clinic.boka?.omslagsbild}
        <div class="mb-8">
          <Image
            class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
            alt={clinic.boka?.omslagsbild?.title ||
              clinic.klinik_page?.title ||
              clinic.klinik_page?.title_en ||
              ""}
            height={450}
            srcPath={clinic.boka?.omslagsbild?.filename_disk || ""}
            width={800} />
        </div>
      {/if}

      <div class="prose prose-lg max-w-none">
        <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <h3 class="mb-6 text-2xl font-semibold">Boka tid</h3>
          <div class="space-y-4 text-gray-700">
            <p>
              {locale === "sv"
                ? clinic.boka?.description
                : clinic.boka?.description_en || clinic.boka?.description}
            </p>
            <p>
              Vi erbjuder flexibla tider för att passa ditt schema. Boka enkelt online eller ring
              oss direkt för att hitta en tid som passar dig.
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Online bokning</h4>
            <p class="mb-4 text-gray-700">
              Boka din tid enkelt online genom vår bokningsportal. Välj tid, behandling och
              terapeut.
            </p>
            <a
              class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              href="https://www.bokadirekt.se"
              rel="noopener noreferrer"
              target="_blank">
              Boka online
            </a>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Ring oss</h4>
            <div class="space-y-2 text-gray-700">
              <p><strong>Telefon:</strong> 013-12 13 14</p>
              <p><strong>Öppettider:</strong></p>
              <p>Måndag-Fredag: 07:00-19:00</p>
              <p>Lördag: 08:00-15:00</p>
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
