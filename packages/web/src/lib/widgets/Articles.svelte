<script lang="ts">
  import ArticleCard from "$lib/components/ArticleCard.svelte";
  import type { L, T } from "$lib/i18n/t";
  import type { ArticlesAndTerapeutsQuery } from "src/routes/[[lang]]/$types.gql";

  export let l: L;
  export let t: T;
  export let articles: ArticlesAndTerapeutsQuery["artiklar"];
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <h2 class="text-theme-heading text-3xl font-bold tracking-tight sm:text-4xl">
    {t("common", "articlesTitle")}
  </h2>
  <p class="text-theme-heading mt-6 text-lg">
    {t("common", "articlesText")}
  </p>
</div>
<div
  class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
  {#each articles as article}
    <ArticleCard {article} {t} {l} sammanfattning={article.sammanfattning} />
  {/each}
</div>
