<script lang="ts">
  import { t, l } from "$lib/i18n";
</script>

<nav class="bg-white p-4 flex flex-row gap-2 w-full shadow font-sans">
  <div class="flex-1">
    <div class="flex flex-col text-left">
      <a class="text-2xl font-bold hover:text-blue-500" href={$l("hem")}>{$t("common", "title")}</a>
      <span class="text-xs text-gray-600">{$t("common", "subtitle")}</span>
    </div>
  </div>
  <a href={$l("blogg")} class="hover:text-blue-500 self-center">{$t("common", "blogg")}</a>
  <a href={$l("smarta")} class="hover:text-blue-500 self-center">{$t("common", "smarta")}</a>
</nav>
