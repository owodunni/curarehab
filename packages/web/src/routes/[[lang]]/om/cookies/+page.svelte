<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
  $: ({ t } = data);
</script>

<TextPage data={data?.data?.cookies} {t} />
