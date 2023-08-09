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
>
  <div class="w-full">
    <h3
      class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading overflow-hidden text-ellipsis"
      lang={t("common", "lang")}
    >
      {title}
    </h3>
  </div>
  <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled">
    {t("common", "bokaNu")}
  </a>
</Card>
