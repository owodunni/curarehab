<script lang="ts">
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Container from "$lib/components/Container.svelte";
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  export let data: PageData;
</script>

<Section>
  <Container>
    <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} l={data.l} t={data.t} />
  </Container>
</Section>

<Seo
  seo={data.params.lang === "en" ? data?.data?.Terapeuter?.seo_en : data?.data?.Terapeuter?.seo}
/>
