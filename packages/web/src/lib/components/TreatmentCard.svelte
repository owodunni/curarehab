<script lang="ts">
  import type { Treatment } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import Image from "./Image.svelte";

  export let treatment: Treatment;
  export let l: L;
  export let t: T;
  export let sammanfattning: string | undefined | null = "";
  export let title: string | undefined | null = "";

  let primary = false;

  $: primary = treatment.Primary_treatment === "true";
</script>

<article class="flex flex-col justify-between">
  <a href={`${l("behandlingar")}/${treatment.Slug}`} class="group">
    <div class="relative w-full">
      <Image
        srcPath={treatment?.bild?.filename_disk || ""}
        alt={treatment?.bild?.title || ""}
        width={800}
        height={450}
        class={`bg-skog-400 object-cover ${
          primary
            ? "w-full  rounded-2xl  aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2]"
            : "rounded-full aspect-square h-32 w-32 mx-auto sm:h-48 sm:w-48 md:h-64 md:w-64"
        } `}
      />
      <div class="absolute inset-0 rounded-2xl" />
    </div>
    <div class="sm:flex sm:justify-between">
      <h3 class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading mt-6">
        {title}
      </h3>

      {#if primary}
        <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled mt-6">
          {t("common", "bokaNu")}
        </a>
      {/if}
    </div>
    <div>
      {#if sammanfattning}
        <article
          class={`text-theme-body text-base leading-7 mt-5 line-clamp-4 ${
            primary ? "sm:line-clamp-6" : ""
          }`}
        >
          {sammanfattning}
        </article>
      {/if}
    </div>
  </a>
</article>
