<script lang="ts">
  const {
    class: clazz = "",
    children,
  }: {
    class?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

<div class={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${clazz || ""}`}>
  {#if children}
    {@render children()}
  {/if}
</div>
