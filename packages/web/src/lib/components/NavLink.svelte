<script lang="ts">
  import { l, t } from "$lib/i18n";
  import type { Page } from "$lib/i18n";
  import Link from "./Link.svelte";

  export let extraLinks: Page[] = [];

  const links: Page[] = ["artiklar", ...extraLinks];
</script>

{#each links as link}
  <Link href={$l(link)}>
    <span class="relative z-10">{$t("common", link)}</span>
  </Link>
{/each}
