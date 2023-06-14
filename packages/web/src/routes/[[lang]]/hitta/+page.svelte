<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="p-4">
  <h1>{data.t("hitta", "title")}</h1>
  <p>{data.t("hitta", "description")}</p>
</div>

<Seo seo={data.params.lang === "en" ? data?.data?.hitta?.seo_en : data?.data?.hitta?.seo} />
