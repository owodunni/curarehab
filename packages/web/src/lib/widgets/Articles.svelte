<script lang="ts">
  import type { Article } from "$lib/api";
  import ArticleCard from "$lib/components/ArticleCard.svelte";
  import type { L, T } from "$lib/i18n/t";

  export let l: L;
  export let t: T;
  export let articles: (Article | null)[];
</script>

<div class="mx-auto max-w-2xl lg:mx-0">
  <slot />
</div>
<div
  class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
>
  {#each articles as article}
    {#if article}
      <ArticleCard {article} {t} {l} sammanfattning={article.sammanfattning} />
    {/if}
  {/each}
</div>
