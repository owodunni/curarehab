<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";

  const { data } = $props();
  const { t } = $derived(data);
</script>

<Section>
  <Container>
    <h1 class="text-theme-heading -mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
      {t("boka", "title")}
    </h1>
    <p class="text-theme-heading my-6 text-lg">
      {t("boka", "description")}
    </p>

    <!-- Visit Information Section -->
    <div class="my-12">
      <h2 class="text-theme-heading mb-4 text-2xl font-semibold">
        {t("boka", "visitTitle")}
      </h2>
      <p class="text-theme-text text-lg">
        {t("boka", "visitDescription")}
      </p>
    </div>

    <!-- Clinic Selection Section -->
    <div class="my-12">
      <h2 class="text-theme-heading mb-4 text-2xl font-semibold">
        {t("boka", "clinicsTitle")}
      </h2>
      <p class="text-theme-text mb-8 text-lg">
        {t("boka", "clinicsDescription")}
      </p>

      <!-- TODO: Add clinic cards here when data is available -->
      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h3 class="mb-2 text-xl font-semibold">City Klinik</h3>
          <p class="mb-4 text-gray-600">Placeholder for city clinic description</p>
          <div class="inline-block cursor-not-allowed rounded-lg bg-gray-400 px-6 py-2 text-white">
            Kommer snart
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h3 class="mb-2 text-xl font-semibold">Mjärdevi Klinik</h3>
          <p class="mb-4 text-gray-600">Placeholder for mjärdevi clinic description</p>
          <div class="inline-block cursor-not-allowed rounded-lg bg-gray-400 px-6 py-2 text-white">
            Kommer snart
          </div>
        </div>
      </div>
    </div>
  </Container>
</Section>
