<script lang="ts">
  import type { Page } from "$lib/i18n";
  import type { L, T } from "$lib/i18n/t";

  export let extraLinks: Page[] = [];

  const links: Page[] = ["skadekompassen", "behandlingar", "hitta", "terapeuter", ...extraLinks];
  export let t: T;
  export let l: L;
</script>

{#each links as link}
  <a href={l(link)} class="btn btn-sm">
    {t("common", link)}
  </a>
{/each}
