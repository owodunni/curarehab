<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
</script>

<TextPage
  data={data?.data?.sekretess}
  lang={data.params.lang}
  title={data.t("personuppgiftspolicy", "title")}
  description={data.t("personuppgiftspolicy", "description")}
/>
