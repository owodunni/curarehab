<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  export let data: PageData;
  console.error($page.status, $page.error?.message);
  $: placeholders = {
    page: data.t("common", "artiklen"),
    resource: data.t("common", "artiklen").toLowerCase(),
    backTo: data.t("common", "artiklar").toLowerCase()
  };
</script>

<Error status={$page.status} l={data.l} t={data.t} page="hem" {placeholders} />
