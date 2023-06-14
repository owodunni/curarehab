<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
</script>

<TextPage
  data={data?.data?.hitta}
  lang={data.params.lang}
  title={data.t("hitta", "title")}
  description={data.t("hitta", "description")}
/>
