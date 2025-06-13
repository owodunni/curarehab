<script lang="ts">
  import { page } from '$app/stores';
  import type { L, T } from '$lib/i18n/t';
  import type { TerapeutsMetaDataQuery } from '../../routes/[[lang]]/terapeuter/$types.gql';
  import CardList from '$lib/components/CardList.svelte';
  import Card from '$lib/components/Card.svelte';

  let {
    l,
    t,
    terapheuts,
  }: {
    l: L;
    t: T;
    terapheuts: TerapeutsMetaDataQuery['terapeuter_directus_users'];
  } = $props();
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
    {t('common', 'terapheutsTitle')}
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html t('common', 'terapheutsText')}
  </p>
</div>
<CardList>
  {#each terapheuts as { directus_users_id } (directus_users_id?.slug)}
    <Card
      link={`${l('terapeuter')}/${directus_users_id?.slug}`}
      image={directus_users_id?.avatar}
      {t}
      shape="circle"
      text={$page.params.lang === 'en'
        ? directus_users_id?.profil_sammanfattning_en
        : directus_users_id?.profil_sammanfattning}
    >
      {directus_users_id?.first_name}
      {directus_users_id?.last_name}
    </Card>
  {/each}
</CardList>
