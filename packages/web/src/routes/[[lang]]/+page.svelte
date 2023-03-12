<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<div class="p-4">
  <h1>{$t("home.title")}</h1>
  <p>{$t("home.description")}</p>
</div>

<!-- TODO: Make this a component -->
<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{$t("home.title")}</title>
  <meta name="description" content={$t("home.description")} />
</svelte:head>
