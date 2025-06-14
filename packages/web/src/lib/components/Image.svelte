<script lang="ts">
  import { getAsset2 } from "$lib/widgets/util";
  import { onMount } from "svelte";
  import type { ComponentProps } from "./types";
  import type { HTMLImgAttributes } from "svelte/elements";

  const {
    width,
    height,
    alt = "",
    lazy = true,
    srcPath,
    class: clazz = "",
    ...restProps
  }: ComponentProps<
    {
      width: number;
      height: number;
      alt?: string;
      lazy?: boolean;
      srcPath: string;
      class?: string;
    },
    HTMLImgAttributes
  > = $props();

  type Format = "avif" | "webp" | "jpg";
  type ImageType = "image/avif" | "image/webp" | "image/jpeg";

  const allowedSized = [64, 100, 112, 200, 250, 400, 450, 627, 800, 1000, 1200];

  // Find first value in allowedSized that is smaller or equal to size
  function findSize(size: number): number {
    for (let i = 0; i < allowedSized.length; i++) {
      if (allowedSized[i] >= size) {
        return allowedSized[i];
      }
    }
    return allowedSized[allowedSized.length - 1];
  }

  function calculateSourceSet(): { type: ImageType; srcset: string }[] {
    const scales = [1, 0.75, 0.5, 0.25];
    const formats = [
      { format: "webp", name: "image/webp" },
      { format: "avif", name: "image/avif" },
      { name: "image/jpeg", format: "jpg" },
    ] as const satisfies readonly { readonly format: Format; readonly name: ImageType }[];

    return formats.map(({ format, name }) => ({
      type: name,
      srcset: scales
        .map((scale) => {
          const aspectRatio = width / height;
          const w = findSize(scale * width);
          const h = findSize(w / aspectRatio);
          const src = getAsset2(srcPath, { width: w, height: h, format, quality: 0.8 });
          return `${src} ${width}w`;
        })
        .join(","),
    }));
  }

  const sourceSet = $derived(calculateSourceSet());

  let node: HTMLElement;
  let intersecting = $state(false);

  onMount(() => {
    if (!node || typeof IntersectionObserver === "undefined") {
      // Fallback for SSR or browsers without IntersectionObserver
      intersecting = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  });
</script>

<picture class={`image-in ${intersecting ? "image-in-place" : ""} `}>
  {#each sourceSet as { type, srcset } (type)}
    <source sizes={`${width}px`} {srcset} {type} />
  {/each}
  <img
    bind:this={node}
    class={`${width < 100 ? "image-sm" : "image"} ${intersecting ? "image-in-place" : ""} ${
      clazz || ""
    }`}
    {alt}
    decoding={lazy ? "async" : undefined}
    {height}
    loading={lazy ? "lazy" : undefined}
    src={getAsset2(srcPath, { width, height, format: "jpg", quality: 80 })}
    {width}
    {...restProps} />
</picture>

<style>
  .image-sm {
    transition: transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(0.95) translateY(12px);
  }

  .image {
    transition: transform 2.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(0.95) translateY(24px);
  }

  .image-in {
    opacity: 0.01;
    transition:
      opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    transition-property: opacity, transform;
    transition-duration: 0.8s, 0.8s;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0s, 0s;
  }

  .image-in-place {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }

  .image:hover {
    transform: scale(1.03);
  }

  .image-sm:hover {
    transform: scale(1.03);
  }
</style>
