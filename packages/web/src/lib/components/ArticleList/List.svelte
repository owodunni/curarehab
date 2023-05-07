<script lang="ts">
  import type { BlogPostMetaData } from "@curarehab/api";
  import Card from "./Card.svelte";

  export let posts: BlogPostMetaData[];
</script>

<div class="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
  <div class="flex max-w-3xl flex-col space-y-16">
    {#each posts as post}
      <Card {post} />
    {/each}
  </div>
</div>
