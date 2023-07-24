<script lang="ts">
  import HeroComponent from "$lib/components/HeroComponent.svelte";
  import type { Image } from "$lib/api";
  import type { T, L } from "$lib/i18n/t";

  export let t: T;
  export let l: L;
  export let image: Image | undefined;
</script>

<HeroComponent {image}>
  <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">
      {t("hem", "titleParagraph")}
    </h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      {t("hem", "subtitleParagraph")}
    </p>
    <div class="mt-8 flex items-center gap-x-6">
      <a href={t("common", "hanoLink")} class="btn variant-filled">{t("hem", "boka")}</a>
      <a href={l("om")} class="text-sm font-semibold leading-6 text-gray-900"
        >{t("hem", "readMore")} <span aria-hidden="true">→</span></a
      >
    </div>
  </div>
</HeroComponent>
