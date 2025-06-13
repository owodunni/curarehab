<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import Error from '$lib/components/Error.svelte';

  export let data: PageData;

  console.error($page.status, $page.error?.message);
  $: placeholders = {
    page: data.t('common', 'artiklen'),
    resource: data.t('common', 'artiklen').toLowerCase(),
    backTo: data.t('common', 'artiklar').toLowerCase(),
  };
</script>

<Error l={data.l} page="hem" {placeholders} status={$page.status} t={data.t} />
