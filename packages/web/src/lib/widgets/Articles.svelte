<script lang="ts">
  import TerapeutCard from "$lib/components/TerapeutCard.svelte";
  import type { L, T } from "$lib/i18n/t";
  import type { ArticlesAndTerapeutsQuery } from "src/routes/[[lang]]/$types.gql";
  import { getAsset, getTitle } from "./util";

  export let l: L;
  export let t: T;
  export let articles: ArticlesAndTerapeutsQuery["artiklar"];
  const toDate = (date: string | undefined) =>
    date ? new Date(date).toLocaleDateString("sv-se") : "";
</script>

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {t("common", "articlesTitle")}
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        {t("common", "articlesText")}
      </p>
    </div>
    <div
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {#each articles as article}
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
              <time
                datetime={article.date_updated ?? article.date_created ?? ""}
                class="text-tertiary-500"
                >{toDate(article?.date_updated ?? article?.date_created)}</time
              >
            </div>
            <h3
              class="text-tertiary-900 group-hover:text-tertiary-600 mt-3 text-lg font-semibold leading-6"
            >
              <span class="absolute inset-0" />
              {article?.title}
            </h3>

            <article class="prose mt-5 line-clamp-6">
              {article?.sammanfattning}
            </article>
          </a>
          <TerapeutCard terapeut={article?.user_created} {t} {l} />
        </article>
      {/each}
    </div>
  </div>
</div>
