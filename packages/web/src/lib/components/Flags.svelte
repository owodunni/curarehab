<script lang="ts">
  import type { T } from "$lib/i18n/t";
  import { getAsset } from "$lib/widgets/util";

  export let t: T;
  export let flag: "swedish" | "english" = "swedish";
  let clazz = "";
  export { clazz as class };
</script>

<img
  class={`aspect-square rounded-full opacity-70 transition-all hover:brightness-[1.15] ${
    clazz || ""
  }`}
  alt={t("common", flag === "swedish" ? "swedishFlag" : "englishFlag")}
  height="32"
  loading="lazy"
  src={getAsset(
    `flags/${flag === "swedish" ? "Flag_of_Sweden.webp" : "Flag_of_the_United_Kingdom.png"}`,
    "width=64&height=64"
  )}
  width="32" />
