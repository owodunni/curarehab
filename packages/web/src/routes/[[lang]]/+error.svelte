<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  export let data: PageData;
  console.error($page.status, $page.error?.message);
  $: placeholders = {
    page: data.t("common", "sidan"),
    resource: data.t("common", "sidan").toLowerCase(),
    backTo: data.t("common", "hem").toLowerCase()
  };
</script>

<Error status={$page.status} l={data.l} t={data.t} page="artiklar" {placeholders} />
