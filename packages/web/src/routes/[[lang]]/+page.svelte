<script lang="ts">
  import Articles from "$lib/widgets/Articles.svelte";
  import Hero from "$lib/widgets/Hero.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import Section from "$lib/components/Section.svelte";
  import type { PageData } from "./$types";
  import Container from "$lib/components/Container.svelte";

  export let data: PageData;
  $: ({ t, l } = data);
</script>

<main>
  <Section class="py-20 sm:py-32 lg:py-0 lg:pb-32 xl:pb-36">
    <Hero {t} {l} />
  </Section>
  <Section extras="bg-success-100">
    <Container>
      <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} {l} {t} />
    </Container>
  </Section>
  <Section>
    <Container>
      <Articles articles={data?.data?.artiklar || []} {l} {t} />
    </Container>
  </Section>
</main>

<svelte:head>
  <title>{data.t("hem", "title")}</title>
  <meta name="description" content={data.t("hem", "description")} />
</svelte:head>
