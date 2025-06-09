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
  t={t}
  shape={primary ? "square" : "circle"}
>
  {title}
</Card>
