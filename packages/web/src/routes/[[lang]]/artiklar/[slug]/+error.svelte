<script lang="ts">
  import { page } from "$app/state";
  import type { PageData } from "./$types";
  import Error from "$lib/components/Error.svelte";

  const { data }: { data: PageData } = $props();

  const placeholders = $derived({
    page: data.t("common", "artiklen"),
    resource: data.t("common", "artiklen").toLowerCase(),
    backTo: data.t("common", "artiklar").toLowerCase(),
  });
</script>

<Error l={data.l} page="hem" {placeholders} status={page.status} t={data.t} />
