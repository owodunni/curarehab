<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
</svelte:head>

<Container class="pb-16">
  <article class="prose">
    <!-- eslint-disable svelte/no-at-html-tags -->
    {@html data.post.html}
  </article>
</Container>
