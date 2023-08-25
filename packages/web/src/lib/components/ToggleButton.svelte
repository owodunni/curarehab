<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let checked = false;
  const clazzButton =
    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none";
  const classSpan =
    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out";

  const dispatch = createEventDispatcher();

  function toggle() {
    dispatch("toggle", { toggle: !checked });
  }
</script>

<button
  type="button"
  class={`${clazzButton} ${checked ? "bg-skog-700" : "bg-sand-200"}`}
  role="switch"
  aria-checked={checked}
  on:click={toggle}
>
  <span aria-hidden="true" class={`${classSpan} ${checked ? "translate-x-5" : "translate-x-0"}`} />
</button>
