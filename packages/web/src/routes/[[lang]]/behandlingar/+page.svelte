<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
</script>

<TextPage
  data={data?.data?.behandlingar}
  lang={data.params.lang}
  title={data.t("behandlingar", "title")}
  description={data.t("behandlingar", "description")}
/>
