<script lang="ts">
  import type { Image } from "$lib/api";
  import type { T, L } from "$lib/i18n/t";
  import { onMount } from "svelte";
  import Img from "./Image.svelte";

  const { t, l, image }: { t: T; l: L; image: Image | undefined } = $props();

  let faded = $state(false);

  onMount(() => {
    faded = true;
  });
</script>

<div class="relative isolate mx-auto max-w-7xl overflow-hidden">
  {#if image}
    <div
      class="bg-skog-700 custom-cb absolute inset-0 -z-10"
      class:opacity-100={!faded}
      class:opacity-40={faded}>
    </div>
    <Img
      class="size-full object-cover"
      alt={image.title || ""}
      height={1000}
      lazy={false}
      pictureClass="absolute inset-0 -z-20 bg-skog-700"
      srcPath={image.filename_disk || ""}
      width={1200} />
  {/if}
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-theme-heading text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("hem", "titleParagraph")}
        </h1>
        <p class="text-theme-body mt-8 text-lg sm:text-xl/8">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html t("hem", "subtitleParagraph")}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a class="btn variant-filled" href={t("common", "hanoLink")}>{t("common", "bokaNu")}</a>
          <a class="btn variant-ghost-white" href={l("om")}
            >{t("hem", "readMore")} <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Tailwind doesn't have custom transition curves, so add this: */
  .custom-cb {
    transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>
