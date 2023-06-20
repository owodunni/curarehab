<script lang="ts">
  import Container from "./Container.svelte";
  import Img from "./Image.svelte";
  import type { Image } from "$lib/api";

  export let image: Image | undefined;
</script>

<Container class="relative">
  <div class="relative z-[5] lg:w-full lg:max-w-2xl">
    <svg
      class="fill-teak-50 absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points="0,0 90,0 50,100 0,100" />
    </svg>

    <div class="relative lg:py-56 lg:pr-0">
      <slot />
    </div>
  </div>
  <div
    class="bg-teak-50 pt-10 sm:pt-20 lg:absolute lg:inset-y-0 lg:right-0 lg:my-10 lg:block lg:w-1/2 lg:pt-0"
  >
    {#if image}
      <Img
        class="aspect-square w-full rounded-2xl object-cover lg:aspect-auto lg:h-full"
        width={1000}
        height={1000}
        srcPath={image.filename_disk || ""}
        alt={image.title || ""}
        lazy={false}
      />
    {/if}
  </div>
</Container>
