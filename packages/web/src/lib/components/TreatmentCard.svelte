<script lang="ts">
  import type { Treatment } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import Card from "./Card.svelte";

  let {
    treatment,
    l,
    t,
    sammanfattning = "",
    title = ""
  }: {
    treatment: Treatment;
    l: L;
    t: T;
    sammanfattning?: string | undefined | null;
    title?: string | undefined | null;
  } = $props();

  let primary = $derived(treatment.Primary_treatment === "true");
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
