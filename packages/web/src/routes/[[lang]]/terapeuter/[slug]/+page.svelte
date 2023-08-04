<script lang="ts">
  import { getTitle } from "$lib/widgets/util";
  import type { Link } from "$lib/api";
  import type { PageData } from "./$types";
  import TextPage from "$lib/components/TextPage.svelte";
  export let data: PageData;
  let links: Link[] = [];
  $: ({ t, terapeut } = data);
  $: links = (terapeut?.social_links || []).filter(Boolean).map((l) => l?.links_id) as Link[];
</script>

<TextPage
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
</TextPage>
