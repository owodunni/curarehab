<script lang="ts">
  import TextPage from "$lib/components/TextPage.svelte";
  import ClinicList from "$lib/components/ClinicList.svelte";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import { userToImageType } from "$lib/components/util.js";

  const { data } = $props();
  const { t, l, localized } = $derived(data);

  const images = $derived(userToImageType(data?.data?.terapeuter_directus_users, t, l));
</script>

<Section class="pt-14 sm:pt-20">
  <Container>
    <div class="mx-auto max-w-2xl pb-12 lg:mx-0">
      <h1 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {localized(data.data?.boka?.boka?.title, data.data?.boka?.boka?.text_en)}
      </h1>
      <p class="text-theme-body mt-6 text-lg">
        {localized(data.data?.boka?.boka?.description, data.data?.boka?.boka?.description_en)}
      </p>
    </div>
    <ClinicList clinics={data.clinics} {images} {l} {localized} {t} />
  </Container>
</Section>

{#if data.bokaPage}
  <TextPage data={data.bokaPage} {t} />
{/if}
