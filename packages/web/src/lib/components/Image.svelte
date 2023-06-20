<script lang="ts">
  import { getAsset2 } from "$lib/widgets/util";
  import IntersectionObserver from "svelte-intersection-observer";

  export let width: number;
  export let height: number;
  export let alt = "";
  export let lazy = true;

  export let srcPath: string;

  type Format = "avif" | "webp" | "jpg";
  type ImageType = "image/avif" | "image/webp" | "image/jpeg";

  function calculateSourceSet(): { type: ImageType; srcset: string }[] {
    const scales = [1, 0.75, 0.5, 0.25];
    const formats = [
      { format: "webp", name: "image/webp" },
      { format: "avif", name: "image/avif" },
      { name: "image/jpeg", format: "jpg" }
    ] as const satisfies readonly { readonly format: Format; readonly name: ImageType }[];

    return formats.map(({ format, name }) => ({
      type: name,
      srcset: scales
        .map((scale) => {
          const w = Math.floor(scale * width);
          const h = Math.floor(scale * height);
          const src = getAsset2(srcPath, { width: w, height: h, format, quality: 0.8 });
          return `${src} ${width}w`;
        })
        .join(",")
    }));
  }

  $: sourceSet = calculateSourceSet();

  let clazz = "";
  export { clazz as class };
  let node: HTMLElement;
</script>

<IntersectionObserver element={node} let:intersecting>
  <picture bind:this={node} class={`image-in ${intersecting ? "image-in-place" : ""} `}>
    {#each sourceSet as { type, srcset }}
      <source {type} {srcset} sizes={`${width}px`} />
    {/each}
    <img
      class={`image ${intersecting ? "image-in-place" : ""} ${clazz || ""}`}
      {width}
      {height}
      src={getAsset2(srcPath, { width, height, format: "jpg", quality: 80 })}
      loading={lazy ? "lazy" : undefined}
      decoding={lazy ? "async" : undefined}
      {alt}
      {...$$restProps}
    />
  </picture>
</IntersectionObserver>

<style>
  .image {
    transition: transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(0.96) translateY(24px);
  }

  .image-in {
    opacity: 0.01;
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    transition-property: opacity, transform;
    transition-duration: 0.8s, 0.8s;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s, 0s;
    transform: scale(0.96) translateY(24px);
  }

  .image-in-place {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }

  .image:hover {
    transform: scale(1.03);
  }
</style>
