<script lang="ts">
  import type { PageData } from './$types';
  import Container from '$lib/components/Container.svelte';
  import Section from '$lib/components/Section.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import Treatments from '$lib/widgets/Treatments.svelte';
  let { data }: { data: PageData } = $props();
  let { l, t } = $derived(data);
</script>

<Section>
  <Container>
    <Treatments {l} {t} treatments={data?.data?.Behandlingar || []} />
  </Container>
</Section>

<Seo
  seo={data.params.lang === 'en' ? data?.data?.behandlingar?.seo_en : data?.data?.behandlingar?.seo}
/>
