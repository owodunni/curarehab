<script lang="ts">
  import { page } from "$app/state";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  const { data }: { data: PageData } = $props();

  const placeholders = $derived({
    page: data.t("common", "behandlingen"),
    resource: data.t("common", "behandlingen").toLowerCase(),
    backTo: data.t("common", "behandlingar").toLowerCase(),
  });
</script>

<Error l={data.l} page="hem" {placeholders} status={page.status} t={data.t} />
