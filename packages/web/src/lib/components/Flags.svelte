<script lang="ts">
  import type { T } from "$lib/i18n/t";
  import { getAsset } from "$lib/widgets/util";

  export let t: T;
  export let flag: "swedish" | "english" = "swedish";
  let clazz = "";
  export { clazz as class };
</script>

<img
  class={`aspect-square rounded-full ${clazz || ""}`}
  loading="lazy"
  width="32"
  height="32"
  src={getAsset(
    `flags/${flag === "swedish" ? "Flag_of_Sweden.webp" : "Flag_of_the_United_Kingdom.png"}`,
    "width=64&height=64"
  )}
  alt={t("common", flag === "swedish" ? "swedishFlag" : "englishFlag")}
/>
