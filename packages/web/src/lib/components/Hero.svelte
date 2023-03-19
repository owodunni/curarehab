<script>
  import { Container, Button } from "$lib/components";
  import rehab from "$lib/assets/rehab-unsplash.jpg";
  import { t, l } from "$lib/i18n";
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

    <div class="relative py-32 px-6 sm:py-40 lg:py-56 lg:px-8 lg:pr-0">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {$t("hem", "titleParagraph")}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          {$t("hem", "subtitleParagraph")}
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <Button href={$l("boka")}>{$t("hem", "boka")}</Button>
          <a href={$l("blogg")} class="text-sm font-semibold leading-6 text-gray-900"
            >{$t("hem", "readMore")} <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img
      class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
      src={rehab}
      alt={$t("hem", "heroImage")}
    />
  </div>
</Container>
