<script lang="ts">
  import type { Article } from "$lib/api";
  import type { L, T } from "$lib/i18n/t";
  import { getAsset } from "$lib/widgets/util";
  import TerapeutCard from "./TerapeutCard.svelte";

  export let article: Article;
  export let l: L;
  export let t: T;
  export let sammanfattning: string | undefined | null = "";
</script>

<article class="flex flex-col justify-between">
  <a href={`${l("artiklar")}/${article.slug}`} class="group">
    <div class="relative w-full max-w-xl">
      <img
        src={getAsset(article?.omslagsbild?.filename_disk)}
        alt={article?.omslagsbild?.title}
        loading="lazy"
        class="bg-tertiary-100 aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div class="ring-tertiary-900/10 absolute inset-0 rounded-2xl ring-1 ring-inset" />
    </div>
    <div class="mt-8 flex items-center gap-x-4 text-xs">
      <time datetime={article.date_updated ?? article.date_created ?? ""} class="text-tertiary-500">
        {new Date(article?.date_updated ?? article?.date_created ?? "").toLocaleDateString("sv-se")}
      </time>
    </div>
    <h3
      class="text-tertiary-900 group-hover:text-tertiary-600 mt-3 text-lg font-semibold leading-6"
    >
      {article?.title}
    </h3>

    {#if sammanfattning}
      <article class="prose mt-5 line-clamp-6">
        {sammanfattning}
      </article>
    {/if}
  </a>
  <TerapeutCard terapeut={article?.user_created} {t} {l} />
</article>
