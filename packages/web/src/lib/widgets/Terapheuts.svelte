<script lang="ts">
  import { page } from "$app/stores";
  import type { L, T } from "$lib/i18n/t";
  import type { TerapeutsMetaDataQuery } from "src/routes/[[lang]]/terapeuter/$types.gql";
  import { getTitle } from "./util";
  import CardList from "$lib/components/CardList.svelte";
  import Card from "$lib/components/Card.svelte";

  export let l: L;
  export let t: T;
  export let terapheuts: TerapeutsMetaDataQuery["terapeuter_directus_users"];
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
  {#each terapheuts as { directus_users_id }}
    <Card
      link={`${l("terapeuter")}/${directus_users_id?.slug}`}
      image={directus_users_id?.avatar}
      shape="circle"
      text={$page.params.lang === "en"
        ? directus_users_id?.profil_sammanfattning_en
        : directus_users_id?.profil_sammanfattning}
    >
      <div class="w-full">
        <h3
          class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading overflow-hidden text-ellipsis"
        >
          {directus_users_id?.first_name}
          {directus_users_id?.last_name}
        </h3>
        <p class="text-theme-muted text-sm leading-6">
          {getTitle(directus_users_id?.work_title || "", t)}
        </p>
      </div>
      <div>
        <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled">
          {t("common", "bokaNu")}
        </a>
      </div>
    </Card>
  {/each}
</CardList>
