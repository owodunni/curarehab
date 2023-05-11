<script lang="ts">
  import type { BlogPostMetaData } from "@curarehab/api";
  import type { T, L } from "$lib/i18n/t";

  export let post: BlogPostMetaData;

  export let t: T;
  export let l: L;

  $: date = new Date(post.updated_at).toLocaleDateString("sv-se");
</script>

<article class="md:grid md:grid-cols-4 md:items-baseline">
  <div class="group relative flex flex-col items-start md:col-span-3">
    <h2 class="text-base font-semibold tracking-tight">
      <div
        class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-gray-100 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"
      />
      <a href={`${l("artiklar")}/${post.slug}`}
        ><span class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" /><span
          class="relative z-10">{post.title}</span
        ></a
      >
    </h2>
    <time
      class="relative z-10 order-first mb-3 flex items-center border-l border-zinc-700/40 pl-3.5 text-sm text-zinc-400 dark:text-zinc-500 md:hidden"
      datetime="2022-09-05"
      ><span class="absolute inset-y-0 left-0 flex items-center" aria-hidden="true"
        ><span class="h-4 w-0.5 rounded-full" /></span
      >{date}</time
    >
    <p class="relative z-10 mt-2 text-sm">
      {post.excerpt}
    </p>
    <div aria-hidden="true" class="relative z-10 mt-4 flex items-center text-sm font-medium">
      {t("artiklar", "readArticle")}<svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        class="ml-1 h-4 w-4 stroke-current"
        ><path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg
      >
    </div>
  </div>
  <time
    class="relative z-10 order-first mb-3 mt-1 flex hidden items-center text-sm md:block"
    datetime="2022-09-05">{date}</time
  >
</article>

<!--li
  class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
>
  <div class="flex flex-1 flex-col p-8">
    <a class="mt-6 text-sm font-medium text-gray-900" href={`${$l("blog")}/${post.slug}`}
      >{post.title}</a
    >
    <dl class="mt-1 flex flex-grow flex-col justify-between">
      <dt class="sr-only">{post.title}</dt>
      <dd class="text-sm text-gray-500">{post.excerpt}</dd>
    </dl>
  </div>
</li-->
