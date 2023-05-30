<script lang="ts">
  //import Articles from "$lib/widgets/Articles.svelte";
  import Hero from "$lib/widgets/Hero.svelte";
  import Terapheuts from "$lib/widgets/Terapheuts.svelte";
  import type { PageData } from "./$houdini";

  export let data: PageData;
  const { t, l } = data;
  console.log(data)

</script>

<main>
  <Hero {t} {l} />
  <Terapheuts store={data.ArticlesAndTerapeuts} {l} {t} />
  <!--Articles {posts} {l} {t} /-->
  <!--MainTreatments /-->
</main>

<svelte:head>
  <title>{data.t("hem", "title")}</title>
  <meta name="description" content={data.t("hem", "description")} />
</svelte:head>
