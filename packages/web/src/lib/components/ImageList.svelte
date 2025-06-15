<script lang="ts">
  import Image from "$lib/components/Image.svelte";

  export type ImageType = {
    alt: string;
    srcPath: string;
    title: string;
    subTitle: string;
    href: string;
  };

  const { images } = $props<{ images: ImageType[] }>();
</script>

<ul class="border-theme-div mt-10 grid grid-cols-2 gap-8 border-t pt-10 text-center sm:grid-cols-3">
  {#each images as { alt, srcPath, title, subTitle, href } (href)}
    <li>
      <a class="group" {href}>
        <Image class="mx-auto h-24 w-24 rounded-full" {alt} height={400} {srcPath} width={400} />

        <h3
          class="text-theme-heading group-hover:text-theme-muted-hover mt-6 text-base font-medium leading-7 tracking-tight">
          {title}
        </h3>
        <p class="text-theme-muted line-clamp-2 text-sm leading-6">
          {subTitle}
        </p>
      </a>
    </li>
  {/each}
</ul>
