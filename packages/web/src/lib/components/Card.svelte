<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { Image as ImageType } from "$lib/api";

  let {
    link,
    image,
    shape = "square",
    text = "",
    children
  }: {
    link: string;
    image: ImageType | undefined | null;
    shape?: "circle" | "square";
    text?: string | undefined | null;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div class="group">
  <div class="relative w-full">
    <a href={link}>
      <Image
        srcPath={image?.filename_disk || ""}
        alt={image?.title || ""}
        width={shape === "square" ? 800 : 400}
        height={shape === "square" ? 450 : 400}
        class={`bg-skog-400 object-cover ${
          shape === "square"
            ? "aspect-[16/9]  w-full  rounded-2xl sm:aspect-[2/1] lg:aspect-[3/2]"
            : "mx-auto aspect-square h-52 w-52 rounded-full md:h-64 md:w-64"
        } `}
      />
    </a>
    <div class="mt-6 flex items-start justify-between">
      {#if children}
        {@render children()}
      {/if}
    </div>
    {#if text}
      <article class={`prose mt-5`}>
        <p class="text-theme-body line-clamp-6 overflow-hidden text-ellipsis text-base leading-7">
          {text}
        </p>
      </article>
    {/if}
  </div>
</div>
