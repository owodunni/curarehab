<script lang="ts">
  import type { Treatment } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import Card from "./Card.svelte";

  export let treatment: Treatment;
  export let l: L;
  export let t: T;
  export let sammanfattning: string | undefined | null = "";
  export let title: string | undefined | null = "";

  let primary = false;

  $: primary = treatment.Primary_treatment === "true";
</script>

<Card
  link={`${l("behandlingar")}/${treatment.Slug}`}
  image={treatment?.bild}
  text={sammanfattning}
  shape={primary ? "square" : "circle"}
  hideTextOnSm={!primary}
>
  <div>
    <h3 class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading">
      {title}
    </h3>

    {#if primary}
      <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled mt-6 sm:hidden">
        {t("common", "bokaNu")}
      </a>
    {/if}
  </div>
  {#if primary}
    <div>
      <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled hidden sm:block">
        {t("common", "bokaNu")}
      </a>
    </div>
  {/if}
</Card>
