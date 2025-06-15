<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import ClinicList from "$lib/components/ClinicList.svelte";

  const { data } = $props();
  const { t, l, localized } = $derived(data);
</script>

<Seo seo={localized(data.kliniker?.seo, data.kliniker?.seo_en)} />

<Container>
  <Section>
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {localized(data.kliniker?.title, data.kliniker?.title_en)}
      </h2>
      <p class="text-theme-body mt-6 text-lg">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html localized(data.kliniker?.description, data.kliniker?.description_en)}
      </p>
    </div>

    <ClinicList clinics={data.klinikerList} {l} {localized} {t} />
  </Section>
</Container>
