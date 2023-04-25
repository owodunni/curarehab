<script lang="ts">
  import type { BlogPostMetaData } from "$lib/api";
  import Card from "./Card.svelte";

  export let posts: BlogPostMetaData[];
</script>

<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {#each posts.filter((p) => p.published) as post}
    <Card {post} />
  {/each}
</ul>
