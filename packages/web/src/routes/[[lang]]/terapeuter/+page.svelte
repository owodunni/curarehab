<script lang="ts">
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Container from "$lib/components/Container.svelte";
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  export let data: PageData;
</script>

<Section>
  <Container>
    <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} l={data.l} t={data.t} />
  </Container>
</Section>

<svelte:head>
  <!-- Simple SEO for now requires a title and description to be provided by the child route -->
  <title>{data.t("terapeuter", "title")}</title>
  <meta name="description" content={data.t("terapeuter", "description")} />
</svelte:head>
