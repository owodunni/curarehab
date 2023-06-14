<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="p-4">
  <h1>{data.t("behandlingar", "title")}</h1>
  <p>{data.t("behandlingar", "description")}</p>
</div>
<Seo
  seo={data.params.lang === "en" ? data?.data?.behandlingar?.seo_en : data?.data?.behandlingar?.seo}
/>
