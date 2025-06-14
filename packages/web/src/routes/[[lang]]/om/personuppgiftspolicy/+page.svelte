<script lang="ts">
  import type { PageData } from "./$types";
  import ContentPage from "$lib/components/ContentPage.svelte";
  export let data: PageData;
  $: ({ t } = data);
</script>

<ContentPage data={data?.data?.sekretess} {t} />
