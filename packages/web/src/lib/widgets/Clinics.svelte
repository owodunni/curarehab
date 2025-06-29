<script lang="ts">
  import ClinicList from "$lib/components/ClinicList.svelte";
  import Container from "$lib/components/Container.svelte";
  import type { ClinicData, ImageWithClinicSlug } from "$lib/components/types";
  import type { L, T } from "$lib/i18n/t";

  const {
    title,
    description,
    t,
    l,
    images,
    localized,
    klinikerList,
  }: {
    title: string;
    description: string;
    t: T;
    l: L;
    images: ImageWithClinicSlug[];
    klinikerList: ClinicData[];
    localized: <T>(sv: T, en: T) => T;
  } = $props();
</script>

<Container>
  <div class="mx-auto max-w-2xl lg:mx-0">
    <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
      {title}
    </h2>
    <p class="text-theme-body mt-6 text-lg">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html description}
    </p>
  </div>

  <ClinicList clinics={klinikerList} {images} {l} {localized} {t} />
</Container>
