<script lang="ts">
  const {
    class: clazz = "py-14 sm:py-20",
    extras = "",
    children,
  }: {
    class?: string;
    extras?: string;
    children?: import("svelte").Snippet;
  } = $props();
</script>

<section class={`bg-section ${clazz} ${extras}`}>
  {#if children}
    {@render children()}
  {/if}
</section>
