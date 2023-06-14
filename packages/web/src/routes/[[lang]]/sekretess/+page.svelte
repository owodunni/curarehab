<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="p-4">
  <h1>{data.t("sekretess", "title")}</h1>
  <p>{data.t("sekretess", "description")}</p>
</div>

<Seo seo={data.params.lang === "en" ? data?.data?.sekretess?.seo_en : data?.data?.sekretess?.seo} />
