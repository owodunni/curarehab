<script lang="ts">
  type Variant = "solid" | "outline";
  type Color = "white" | "gray";

  const baseStyles: Record<Variant, string> = {
    solid:
      "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
    outline:
      "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors"
  };

  const baseVariantStyles: Record<Variant, Partial<Record<Color, string>>> = {
    solid: {
      gray: "text-white"
    },
    outline: {}
  };

  const disabledVariantStyles: Record<Variant, Partial<Record<Color, string>>> = {
    solid: {
      gray: "bg-gray-500"
    },
    outline: {}
  };

  const variantStyles: Record<Variant, Partial<Record<Color, string>>> = {
    solid: {
      gray: "bg-gray-800 hover:bg-gray-900 active:bg-gray-800 active:text-white/80"
    },
    outline: {
      gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80"
    }
  };
  export let variant: Variant = "solid";
  export let color: Color = "gray";
  export let disabled = false;
  export let href = "";
  let _clazz = "";
  export { _clazz as class };

  export let type: "submit" | "button" | undefined = undefined;
  export let form: string | undefined = undefined;

  $: clazz = `${baseStyles[variant]} ${baseVariantStyles[variant][color] || ""} ${
    (disabled ? disabledVariantStyles : variantStyles)[variant][color] || ""
  } ${_clazz || ""}`;
</script>

{#if href}
  <a {href} class={clazz} on:click><slot /></a>
{:else}
  <button class={clazz} on:click {disabled} {type} {form}><slot /></button>
{/if}
