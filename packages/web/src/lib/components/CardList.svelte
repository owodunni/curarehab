<script lang="ts">
  export let extras = "";
</script>

<div
  class={`mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 pt-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ${extras}`}
>
  <slot />
</div>
