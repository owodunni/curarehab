<script lang="ts">
  import type { Treatment } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import Card from "./Card.svelte";

  const {
    treatment,
    l,
    t,
    sammanfattning = "",
    title = "",
  }: {
    treatment: Treatment;
    l: L;
    t: T;
    sammanfattning?: string | undefined | null;
    title?: string | undefined | null;
  } = $props();

  const primary = $derived(treatment.Primary_treatment === "true");
</script>

<Card
  image={treatment?.bild}
  link={`${l("behandlingar")}/${treatment.Slug}`}
  shape={primary ? "square" : "circle"}
  {t}
  text={sammanfattning}>
  {title}
</Card>
