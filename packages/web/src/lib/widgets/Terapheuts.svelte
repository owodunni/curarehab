<script lang="ts">
  import { page } from "$app/state";
  import type { L, T } from "$lib/i18n/t";
  import CardList from "$lib/components/CardList.svelte";
  import Card from "$lib/components/Card.svelte";
  import type { User } from "$lib/components/types";

  const {
    l,
    t,
    terapheuts,
  }: {
    l: L;
    t: T;
    terapheuts: User[];
  } = $props();

  // Destructure for better change tracking & fewer redraws
  const { params } = $derived(page);
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
    {t("common", "terapheutsTitle")}
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html t("common", "terapheutsText")}
  </p>
</div>
<CardList>
  {#each terapheuts as { directus_users_id } (directus_users_id?.slug)}
    <Card
      image={directus_users_id?.avatar}
      link={`${l("terapeuter")}/${directus_users_id?.slug}`}
      shape="circle"
      {t}
      text={params.lang === "en"
        ? directus_users_id?.profil_sammanfattning_en
        : directus_users_id?.profil_sammanfattning}>
      {directus_users_id?.first_name}
      {directus_users_id?.last_name}
    </Card>
  {/each}
</CardList>
