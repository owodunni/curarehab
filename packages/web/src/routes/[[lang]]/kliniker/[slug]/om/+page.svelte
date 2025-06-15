<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Image from "$lib/components/Image.svelte";

  const { data } = $props();
  const { t, localized } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const om = $derived(data.clinic);
</script>

<Seo seo={localized(om.seo, om.seo_en)} />

<Container>
  <Section>
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {localized(om?.title, om?.title_en)}
      </h2>
      <p class="text-theme-body mt-6 text-lg">
        {localized(om?.description, om?.description_en)}
      </p>
    </div>

    <div class="mx-auto max-w-4xl">
      {#if om?.omslagsbild}
        <div class="mb-8">
          <Image
            class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
            alt={om?.omslagsbild?.title || ""}
            height={450}
            srcPath={om?.omslagsbild?.filename_disk || ""}
            width={800} />
        </div>
      {/if}

      <div class="prose prose-lg max-w-none">
        <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <h3 class="mb-6 text-2xl font-semibold">Om vår klinik</h3>
          <div class="space-y-4 text-gray-700">
            <p>
              {locale === "sv" ? om?.description : om?.description_en || om?.description}
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
    </div>
  </Section>
</Container>
