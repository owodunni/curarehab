<script lang="ts">
  import type { Link } from "$lib/api";
  import LinkIcon from "./LinkIcon.svelte";

  export let link: Link;

  export let onlyIcon = true;
  let clazz = "";
  export { clazz as class };
</script>

<a href={link.link} class={`${clazz || ""}`}>
  <LinkIcon type={link.type} class="h-6 w-6" />
  {#if onlyIcon === false} <span>{link.display_link}</span> {/if}
</a>
