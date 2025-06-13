<script lang="ts">
  import { page } from '$app/stores';
  import CardList from '$lib/components/CardList.svelte';
  import TreatmentCard from '$lib/components/TreatmentCard.svelte';
  import type { L, T } from '$lib/i18n/t';
  import type { ArticlesAndTerapeutsQuery } from '../../routes/[[lang]]/$types.gql';

  export let l: L;
  export let t: T;
  export let treatments: ArticlesAndTerapeutsQuery['Behandlingar'];
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
    {t('common', 'treatmentsTitle')}
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html t('common', 'treatmentsText')}
  </p>
</div>
<CardList>
  {#each treatments.filter((treatment) => treatment.Primary_treatment === 'true') as treatment (treatment.Slug)}
    <TreatmentCard
      {l}
      sammanfattning={$page.params.lang !== 'en'
        ? treatment?.behandling_sammanfattning
        : treatment?.behandling_sammanfattning_en}
      {t}
      title={$page.params.lang !== 'en' ? treatment?.Title : treatment?.Title_en}
      {treatment}
    />
  {/each}
</CardList>
<CardList extras="border-t border-theme-div">
  {#each treatments.filter((treatment) => treatment.Primary_treatment !== 'true') as treatment (treatment.Slug)}
    <TreatmentCard
      {l}
      sammanfattning={$page.params.lang !== 'en'
        ? treatment?.behandling_sammanfattning
        : treatment?.behandling_sammanfattning_en}
      {t}
      title={$page.params.lang !== 'en' ? treatment?.Title : treatment?.Title_en}
      {treatment}
    />
  {/each}
</CardList>
