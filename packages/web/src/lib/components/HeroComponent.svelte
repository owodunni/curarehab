<script lang="ts">
  import rehab from "$lib/assets/rehab-unsplash.webp";
  import Container from "./Container.svelte";
  import type { T } from "$lib/i18n/t";

  export let t: T;
</script>

<Container class="relative">
  <div class="relative z-[5] pt-14 lg:w-full lg:max-w-2xl">
    <svg
      class="fill-surface-50 absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points="0,0 90,0 50,100 0,100" />
    </svg>

    <div class="relative py-32 sm:py-40 lg:py-56 lg:pr-0">
      <slot />
    </div>
  </div>
  <div class="bg-surface-50 hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
    <img
      class="aspect-[3/2] rounded-2xl object-cover lg:aspect-auto lg:h-full lg:w-full"
      loading="lazy"
      src={rehab}
      alt={t("common", "heroImage")}
    />
  </div>
</Container>
