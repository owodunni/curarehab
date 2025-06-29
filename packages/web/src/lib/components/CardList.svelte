<script lang="ts">
  const {
    extras = "",
    children,
  }: {
    extras?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

<div
  class={`mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ${extras}`}>
  {#if children}
    {@render children()}
  {/if}
</div>
