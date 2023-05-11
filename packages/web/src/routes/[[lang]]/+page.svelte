<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <Hero t={data.t} l={data.l} />
  <!--MainTreatments /-->
</main>

<svelte:head>
  <title>{data.t("hem", "title")}</title>
  <meta name="description" content={data.t("hem", "description")} />
</svelte:head>
