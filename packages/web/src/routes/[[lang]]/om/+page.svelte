<script lang="ts">
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  export let data: PageData;
  $: ({ t, l } = data);
</script>

<TextPage data={data?.data?.om} lang={data.params.lang} />
<Section extras="theme-skog">
  <Container>
    <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} {l} {t} />
  </Container>
</Section>
