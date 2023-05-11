<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="p-4">
  <h1>{data.t("hitta", "title")}</h1>
  <p>{data.t("hitta", "description")}</p>
</div>

<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{data.t("hitta", "title")}</title>
  <meta name="description" content={data.t("hitta", "description")} />
</svelte:head>
