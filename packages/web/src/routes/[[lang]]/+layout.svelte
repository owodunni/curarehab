<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import "../../theme.postcss";
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  // Most of your app wide CSS should be put in this file
  import "../../app.postcss";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<Header t={data.t} l={data.l} locale={data.params.lang === "en" ? "en" : "sv"} route={data.route} />
<slot />
<Footer t={data.t} l={data.l} />
