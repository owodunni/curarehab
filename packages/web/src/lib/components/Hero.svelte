<script>
  import { Button } from "$lib/components";
  import { t, l } from "$lib/i18n";
  import HeroComponent from "./HeroComponent.svelte";
</script>

<HeroComponent>
  <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      {$t("hem", "titleParagraph")}
    </h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      {$t("hem", "subtitleParagraph")}
    </p>
    <div class="mt-10 flex items-center gap-x-6">
      <Button href={$l("boka")}>{$t("hem", "boka")}</Button>
      <a href={$l("blog")} class="text-sm font-semibold leading-6 text-gray-900"
        >{$t("hem", "readMore")} <span aria-hidden="true">→</span></a
      >
    </div>
  </div>
</HeroComponent>
