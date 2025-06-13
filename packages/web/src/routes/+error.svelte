<script lang="ts">
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import Error from '$lib/components/Error.svelte';

  export let data: LayoutData;
  // eslint-disable-next-line no-console
  console.error($page.status, $page.error);
  $: placeholders = {
    page: data.t('common', 'sidan'),
    resource: data.t('common', 'sidan').toLowerCase(),
    backTo: data.t('common', 'hem').toLowerCase(),
  };
</script>

<Error status={$page.status} l={data.l} t={data.t} page="artiklar" {placeholders} />
