<script lang="ts">
  import { page } from "$app/state";
  import type { LayoutData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  const { data }: { data: LayoutData } = $props();

  const placeholders = $derived({
    page: data.t("common", "sidan"),
    resource: data.t("common", "sidan").toLowerCase(),
    backTo: data.t("common", "hem").toLowerCase(),
  });
</script>

<Error l={data.l} page="artiklar" {placeholders} status={page.status} t={data.t} />
