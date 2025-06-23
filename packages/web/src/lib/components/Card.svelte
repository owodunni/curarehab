<script lang="ts">
  import Image from "$lib/components/Image.svelte";
  import type { Image as ImageType } from "$lib/api";
  import type { T } from "$lib/i18n/t";
  import type { Snippet } from "svelte";

  const {
    link,
    image,
    shape = "square",
    text = "",
    t,
    children,
    buttons,
    extra,
  }: {
    link: string;
    t: T;
    image: ImageType | undefined | null;
    shape?: "circle" | "square";
    text?: string | undefined | null;
    children?: Snippet;
    buttons?: Snippet;
    extra?: Snippet;
  } = $props();
</script>

<div class="group max-w-[480px]">
  <div class="relative w-full">
    <a href={link}>
      <Image
        class={`bg-skog-400 object-cover ${
          shape === "square"
            ? "aspect-[16/9]  w-full  rounded-2xl sm:aspect-[2/1] lg:aspect-[3/2]"
            : "mx-auto aspect-square h-52 w-52 rounded-full md:h-64 md:w-64"
        } `}
        alt={image?.title || ""}
        height={shape === "square" ? 450 : 400}
        srcPath={image?.filename_disk || ""}
        width={shape === "square" ? 800 : 400} />
    </a>
    <div class="mt-6 flex items-start justify-between gap-x-6">
      {#if children}
        <a class="flex-1" href={link}>
          <h3
            class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading overflow-hidden text-ellipsis"
            lang={t("common", "lang")}>
            {@render children()}
          </h3>
        </a>
        {#if buttons}
          {@render buttons()}
        {:else}
          <a class="btn btn-sm variant-filled" href={t("common", "hanoLink")}>
            {t("common", "bokaNu")}
          </a>
        {/if}
      {/if}
    </div>
    {#if text}
      <a href={link}>
        <article class="prose mt-5">
          <p class="text-theme-body line-clamp-6 overflow-hidden text-ellipsis text-base leading-7">
            {text}
          </p>
        </article>
      </a>
    {/if}
    {#if extra}
      {@render extra()}
    {/if}
  </div>
</div>
