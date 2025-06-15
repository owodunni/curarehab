<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  const { data } = $props();
  const { t, localized, l } = $derived(data);
  const locale = $derived(t("common", "lang"));
  const { clinic, boka, slug } = $derived(data);
</script>

<Seo seo={localized(clinic?.seo, clinic?.seo_en)} />

<Container>
  <Section>
    <!-- Breadcrumb -->
    <div class="mb-6">
      <Breadcrumb
        items={[
          {
            title: localized(clinic?.title, clinic?.title_en) || "",
            current: true,
          },
        ]}
        {l} />
    </div>

    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {localized(clinic?.title, clinic?.title_en)}
      </h2>
    </div>

    {#if clinic?.omslagsbild}
      <div class="my-12">
        <Image
          class="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
          alt={clinic?.omslagsbild?.title || ""}
          height={450}
          srcPath={clinic?.omslagsbild?.filename_disk || ""}
          width={800} />
      </div>
    {/if}

    <!-- Booking Section -->
    {#if boka}
      <div class="mb-12">
        <div class="prose prose-lg max-w-none">
          <div class="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <h3 class="mb-6 text-2xl font-semibold">{t("kliniker", "bokaTitle")}</h3>
            <div class="space-y-4 text-gray-700">
              <p>
                {localized(boka?.description, boka?.description_en)}
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
                href={`${l("kliniker")}/${slug}/boka`}>
                {t("kliniker", "bokaTitle")}
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
          href="/{locale}/kliniker/{slug}/boka">
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
          href="/{locale}/kliniker/{slug}/hitta">
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
          href="/{locale}/kliniker/{slug}/om">
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
