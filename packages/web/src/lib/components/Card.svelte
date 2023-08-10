<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { Image as ImageType } from "$lib/api";

  export let link: string;
  export let image: ImageType | undefined | null;
  export let shape: "circle" | "square" = "square";
  export let text: string | undefined | null = "";
</script>

<a href={link} class="group">
  <div class="relative w-full">
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
    <div class="mt-6 flex items-start justify-between">
      <slot />
    </div>
    {#if text}
      <article class={`prose mt-5`}>
        <p class="text-theme-body line-clamp-6 overflow-hidden text-ellipsis text-base leading-7">
          {text}
        </p>
      </article>
    {/if}
  </div>
</a>
