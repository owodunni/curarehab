<script lang="ts">
  import type { Article } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import TerapeutCard from "./TerapeutCard.svelte";
  import Image from "./Image.svelte";

  export let article: Article;
  export let l: L;
  export let t: T;
  export let sammanfattning: string | undefined | null = "";
</script>

<article class="flex flex-col justify-between">
  <a href={`${l("artiklar")}/${article.slug}`} class="group">
    <div class="relative w-full max-w-xl">
      <Image
        srcPath={article?.omslagsbild?.filename_disk || ""}
        alt={article?.omslagsbild?.title || ""}
        width={800}
        height={450}
        class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div class="absolute inset-0 rounded-2xl" />
    </div>
    <div class="mt-8 flex items-center gap-x-4 text-xs">
      <time datetime={article.date_updated ?? article.date_created ?? ""} class="text-theme-muted">
        {new Date(article?.date_updated ?? article?.date_created ?? "").toLocaleDateString("sv-se")}
      </time>
    </div>
    <h3
      class="text-theme-heading group-hover:text-theme-muted-hover text-lg-heading overflow-hidden text-ellipsis"
    >
      {article?.title}
    </h3>

    {#if sammanfattning}
      <article class="text-theme-body text-xl-summary mt-5 line-clamp-6">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html sammanfattning}
      </article>
    {/if}
  </a>
  <TerapeutCard terapeut={article?.user_created} {t} {l} />
</article>
