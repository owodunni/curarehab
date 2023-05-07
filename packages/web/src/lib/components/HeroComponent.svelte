<script>
  import { Container } from "$lib/components";
  import rehab from "$lib/assets/rehab-unsplash.webp";
  import { t } from "$lib/i18n";
</script>

<Container class="relative">
  <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
    <svg
      class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
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
  <div class="hidden bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
    <img
      class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
      src={rehab}
      alt={$t("common", "heroImage")}
    />
  </div>
</Container>
