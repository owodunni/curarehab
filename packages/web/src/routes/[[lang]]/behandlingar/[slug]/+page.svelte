<script lang="ts">
  import type { PageData } from "./$types";
  import ContentPage from "$lib/components/ContentPage.svelte";
  const { data }: { data: PageData } = $props();
  const { t, behandling } = $derived(data);
</script>

<ContentPage
  data={{
    image: behandling.bild,
    seo: behandling.seo,
    seo_en: behandling.seo_en,
    text: behandling.behandling_text,
    text_en: behandling.behandling_text_en,
  }}
  {t}>
  <h3 class="text-skog-900 group-hover:text-skog-700 text-lg font-medium leading-8 tracking-tight">
    {data.params.lang === "en" ? behandling?.Title_en : behandling?.Title}
  </h3>
  <p class="text-skog-700 text-base leading-7">
    {t("behandlingar", "pris")}:
    {behandling.pris} kr
  </p>
  <p class="text-skog-700 text-base leading-7">
    {t("behandlingar", "tid")}:
    {behandling.tid} min
  </p>
</ContentPage>
