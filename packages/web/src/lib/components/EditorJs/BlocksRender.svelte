<script lang="ts">
  import type { Block } from "./types";
  import BlockRender from "./BlockRender.svelte";

  export let blocks: Block[];
</script>

{#each blocks as block}
  <BlockRender {block} />
{/each}
