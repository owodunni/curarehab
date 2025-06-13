<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Error from '$lib/components/Error.svelte';

  export let data: PageData;

  console.error($page.status, $page.error?.message);
  $: placeholders = {
    page: data.t('common', 'behandlingen'),
    resource: data.t('common', 'behandlingen').toLowerCase(),
    backTo: data.t('common', 'behandlingar').toLowerCase(),
  };
</script>

<Error l={data.l} page="hem" {placeholders} status={$page.status} t={data.t} />
