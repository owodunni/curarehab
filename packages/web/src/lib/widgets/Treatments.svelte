<script lang="ts">
  import { page } from "$app/stores";
  import TreatmentCard from "$lib/components/TreatmentCard.svelte";
  import type { L, T } from "$lib/i18n/t";
  import type { ArticlesAndTerapeutsQuery } from "src/routes/[[lang]]/$types.gql";

  export let l: L;
  export let t: T;
  export let treatments: ArticlesAndTerapeutsQuery["Behandlingar"];
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
    {t("common", "treatmentsTitle")}
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    {t("common", "treatmentsText")}
  </p>
</div>
<div
  class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
  {#each treatments.filter((t) => t.Primary_treatment === "true") as treatment}
    <TreatmentCard
      {treatment}
      {l}
      {t}
      sammanfattning={$page.params.lang !== "en"
        ? treatment?.behandling_sammanfattning
        : treatment?.behandling_sammanfattning_en}
      title={$page.params.lang !== "en" ? treatment?.Title : treatment?.Title_en}
    />
  {/each}
</div>
<div
  class="border-theme-div mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 border-t pt-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
  {#each treatments.filter((t) => t.Primary_treatment !== "true") as treatment}
    <TreatmentCard
      {treatment}
      {l}
      {t}
      sammanfattning={$page.params.lang !== "en"
        ? treatment?.behandling_sammanfattning
        : treatment?.behandling_sammanfattning_en}
      title={$page.params.lang !== "en" ? treatment?.Title : treatment?.Title_en}
    />
  {/each}
</div>
