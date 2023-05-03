<script lang="ts">
  export let href: string;
</script>

<a
  {href}
  class="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:bg-gray-100 hover:text-gray-900 hover:delay-[0ms]"
>
  <slot />
</a>
