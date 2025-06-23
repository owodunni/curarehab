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
    <div class="mx-auto max-w-2xl pt-32 lg:pt-48">
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
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <h2 class="text-lg/8 font-semibold text-white">
            Trusted by the world’s most innovative teams
          </h2>
          <div
            class="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
            <img
              class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
              alt="Transistor"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/transistor-logo-white.svg"
              width="158" />
            <img
              class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
              alt="Reform"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/reform-logo-white.svg"
              width="158" />
            <img
              class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
              alt="Tuple"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/tuple-logo-white.svg"
              width="158" />
            <img
              class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
              alt="SavvyCal"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-white.svg"
              width="158" />
            <img
              class="col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1"
              alt="Statamic"
              height="48"
              src="https://tailwindcss.com/plus-assets/img/logos/statamic-logo-white.svg"
              width="158" />
          </div>
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
