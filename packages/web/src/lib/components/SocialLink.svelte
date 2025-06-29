<script lang="ts">
  import type { Link } from "$lib/api";
  import LinkIcon from "./LinkIcon.svelte";

  export let link: Link;

  export let onlyIcon = true;
  let clazz = "";
  export { clazz as class };
</script>

<a class={`${clazz || ""}`} href={link.link}>
  <LinkIcon class="h-6 w-6" type={link.type} />
  {#if onlyIcon === false}
    <p class="w-full overflow-hidden text-ellipsis">{link.display_link}</p>
  {/if}
</a>
