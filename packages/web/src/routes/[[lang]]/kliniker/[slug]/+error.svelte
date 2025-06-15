<script lang="ts">
  import { page } from "$app/state";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  const { data }: { data: PageData } = $props();

  const placeholders = $derived({
    page: data.t("common", "kliniken"),
    resource: data.t("common", "kliniken").toLowerCase(),
    backTo: data.t("common", "kliniken").toLowerCase(),
  });
</script>

<Error l={data.l} page="kliniker" {placeholders} status={page.status} t={data.t} />
