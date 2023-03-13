<script lang="ts">
  import { t } from "$lib/i18n";
</script>

<div class="p-4">
  <h1>{$t("hem.title")}</h1>
  <p>{$t("hem.description")}</p>
  <a href={$t("common.link", { default: "/om" })}>{$t("hem.aboutLink")}</a>
</div>

<!-- TODO: Make this a component -->
<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{$t("hem.title")}</title>
  <meta name="description" content={$t("hem.description")} />
</svelte:head>
