<script lang="ts">
  let clazz = "py-20 sm:py-32 lg:pb-32 xl:pb-36";
  export { clazz as class };
  export let extras = "";
</script>

<section class={`bg-section ${clazz} ${extras}`}>
  <slot />
</section>
