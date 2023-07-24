<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
</script>

<TextPage data={data?.data?.cookies} lang={data.params.lang} />
