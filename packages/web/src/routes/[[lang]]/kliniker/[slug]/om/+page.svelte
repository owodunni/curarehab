<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Image from "$lib/components/Image.svelte";

  const { data } = $props();
  const { t } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const clinic = $derived(data.clinic);
</script>

<Seo
  seo={{
    title:
      t("kliniker", "aboutTitle") +
      " - " +
      (locale === "sv" ? clinic.title : clinic.title_en || clinic.title),
    description: t("kliniker", "aboutDescription"),
  }} />

<Container>
  <Section>
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold text-gray-900">
        {t("kliniker", "aboutTitle")}
      </h1>
      <h2 class="mb-4 text-2xl text-gray-600">
        {locale === "sv" ? clinic.title : clinic.title_en || clinic.title}
      </h2>
      <p class="mx-auto max-w-3xl text-xl text-gray-600">
        {t("kliniker", "aboutDescription")}
      </p>
    </div>

    <div class="mx-auto max-w-4xl">
      {#if clinic.omslags_bild}
        <div class="mb-8">
          <Image
            class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
            alt={clinic.omslags_bild?.title || clinic.title || clinic.title_en || ""}
            height={450}
            srcPath={clinic.omslags_bild?.filename_disk || ""}
            width={800} />
        </div>
      {/if}

      <div class="prose prose-lg max-w-none">
        <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <h3 class="mb-6 text-2xl font-semibold">Om vår klinik</h3>
          <div class="space-y-4 text-gray-700">
            <p>
              {locale === "sv" ? clinic.description : clinic.description_en || clinic.description}
            </p>
            <p>
              Vår klinik erbjuder högkvalitativ vård inom naprapati, fysioterapi och massage. Vi har
              erfarna terapeuter som arbetar med evidensbaserade metoder för att hjälpa våra
              patienter att återfå sin hälsa och rörlighet.
            </p>
            <p>
              Vi tror på en holistisk approach till hälsa och arbetar nära våra patienter för att
              skapa individuella behandlingsplaner som passar just deras behov.
            </p>
          </div>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Våra tjänster</h4>
            <ul class="space-y-2 text-gray-700">
              <li>• Naprapatbehandling</li>
              <li>• Fysioterapi/Sjukgymnastik</li>
              <li>• Medicinsk massage</li>
              <li>• Akupunktur</li>
              <li>• Rehabilitering</li>
            </ul>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h4 class="mb-4 text-xl font-semibold">Kontakta oss</h4>
            <div class="space-y-2 text-gray-700">
              <p><strong>Telefon:</strong> 013-12 13 14</p>
              <p><strong>E-post:</strong> info@curarehab.se</p>
              <p><strong>Adress:</strong> Placeholder Address, Linköping</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 text-center">
        <a
          class="text-blue-600 transition-colors hover:text-blue-800"
          href="/{locale}/kliniker/{clinic.slug}">
          ← Tillbaka till {locale === "sv" ? clinic.title : clinic.title_en || clinic.title}
        </a>
      </div>
    </div>
  </Section>
</Container>
