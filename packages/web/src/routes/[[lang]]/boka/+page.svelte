<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import Section from "$lib/components/Section.svelte";
  import TextPage from "$lib/components/TextPage.svelte";
  import ImageList from "$lib/components/ImageList.svelte";

  const { data } = $props();
  const { t } = $derived(data);
  const locale = $derived(t("common", "lang"));
</script>

{#if data.bokaPage}
  <TextPage data={data.bokaPage} {t} />
{/if}

{#if data.clinicImages && data.clinicImages.length > 0}
  <Section>
    <Container>
      <h2 class="text-theme-heading mb-4 text-2xl font-semibold">
        {locale === "sv" ? "Våra kliniker" : "Our clinics"}
      </h2>
      <p class="text-theme-text mb-8 text-lg">
        {locale === "sv"
          ? "Välj den klinik som passar dig bäst för din behandling."
          : "Choose the clinic that suits you best for your treatment."}
      </p>
      <ImageList images={data.clinicImages} />
    </Container>
  </Section>
{/if}
