<script lang="ts">
  import Articles from "$lib/widgets/Articles.svelte";
  import Hero from "$lib/widgets/Hero.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ t, l } = data);
</script>

<main>
  <Hero {t} {l} />
  <Terapheuts terapheuts={data?.data?.terapeuter_directus_users || []} {l} {t} />
  <Articles articles={data?.data?.artiklar || []} {l} {t} />
</main>

<svelte:head>
  <title>{data.t("hem", "title")}</title>
  <meta name="description" content={data.t("hem", "description")} />
</svelte:head>
