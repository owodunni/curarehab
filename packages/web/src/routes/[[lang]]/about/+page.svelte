<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<div class="p-4">
  <h1>{$t("about.title")}</h1>
  <p>{$t("about.description")}</p>
</div>

<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{$t("about.title")}</title>
  <meta name="description" content={$t("about.description")} />
</svelte:head>
