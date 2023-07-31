<script lang="ts">
  let clazz = "py-10 sm:py-20";
  export { clazz as class };
  export let extras = "";
</script>

<section class={`bg-section ${clazz} ${extras}`}>
  <slot />
</section>
