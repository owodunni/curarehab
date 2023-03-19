<script lang="ts">
  import { Hero } from "$lib/components";
  import MainTreatments from "$lib/components/MainTreatments.svelte";
  import { t } from "$lib/i18n";
</script>

<main>
  <Hero />
  <MainTreatments />
</main>

<!-- TODO: Make this a component -->
<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{$t("hem", "title")}</title>
  <meta name="description" content={$t("hem", "description")} />
</svelte:head>
