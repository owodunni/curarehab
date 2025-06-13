<script lang="ts">
  import Terapheuts from '$lib/widgets/Terapheuts.svelte';
  import Container from '$lib/components/Container.svelte';
  import type { PageData } from './$types';
  import Section from '$lib/components/Section.svelte';
  import Seo from '$lib/components/Seo.svelte';
  const { data }: { data: PageData } = $props();
</script>

<Section>
  <Container>
    <Terapheuts l={data.l} t={data.t} terapheuts={data?.data?.terapeuter_directus_users || []} />
  </Container>
</Section>

<Seo
  seo={data.params.lang === 'en' ? data?.data?.Terapeuter?.seo_en : data?.data?.Terapeuter?.seo}
/>
