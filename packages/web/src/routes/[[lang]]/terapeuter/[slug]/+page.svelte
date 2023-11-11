<script lang="ts">
  import { getTitle } from "$lib/widgets/util";
  import type { Link } from "$lib/api";
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import ContentPage from "$lib/components/ContentPage.svelte";
  import Articles from "$lib/widgets/Articles.svelte";
  export let data: PageData;
  let links: Link[] = [];
  $: ({ t, terapeut, l } = data);
  $: links = (terapeut?.social_links || []).filter(Boolean).map((l) => l?.links_id) as Link[];
</script>

<ContentPage
  data={{
    image: terapeut.avatar,
    seo: terapeut.seo,
    seo_en: terapeut.seo_en,
    text: terapeut.profil_text,
    text_en: terapeut.profil_text_en,
    links
  }}
  {t}
>
  <h3 class="text-skog-900 group-hover:text-skog-700 text-lg font-medium leading-8 tracking-tight">
    {terapeut.first_name}
    {terapeut.last_name}
  </h3>
  <p class="text-skog-700 text-base leading-7">
    {getTitle(terapeut.work_title || "", t)}
  </p>
</ContentPage>
{#if terapeut?.artiklar?.length || 0 > 0}
  <Section class="">
    <Container class="pb-14 sm:pb-20">
      <div class="border-1 border-t sm:mx-4 lg:mx-0" />
      <Articles articles={terapeut?.artiklar || []} {l} {t} />
    </Container>
  </Section>
{/if}
