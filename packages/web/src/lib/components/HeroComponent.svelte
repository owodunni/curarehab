<script lang="ts">
  import Container from "./Container.svelte";
  import Img from "./Image.svelte";
  import type { Image } from "$lib/api";

  export let image: Image | undefined;
</script>

<Container class="relative">
  <div class="relative z-[5] lg:w-full lg:max-w-2xl">
    <svg
      class="fill-section absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform lg:block"
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 100 100">
      <polygon points="0,0 90,0 50,100 0,100" />
    </svg>

    <div class="relative lg:py-32 lg:pr-0">
      <slot></slot>
    </div>
  </div>
  <div
    class="bg-section pt-10 sm:pt-20 lg:absolute lg:inset-y-0 lg:right-0 lg:my-10 lg:block lg:w-1/2 lg:pt-0">
    {#if image}
      <Img
        class="aspect-square w-full rounded-2xl object-cover lg:aspect-auto lg:h-full"
        alt={image.title || ""}
        height={1000}
        lazy={false}
        srcPath={image.filename_disk || ""}
        width={1000} />
    {/if}
  </div>
</Container>
