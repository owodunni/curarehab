<script lang="ts">
  import { l, t } from "$lib/i18n";

  const links = ["om", "blogg"] as const;
</script>

{#each links as link}
  <a
    href={$l(link)}
    class="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:bg-gray-100 hover:text-gray-900 hover:delay-[0ms]"
  >
    <span>{$t("common", link)}</span>
  </a>
{/each}
