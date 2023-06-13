<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import TerapeutCard from "$lib/components/TerapeutCard.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ article } = data);
  const toDate = (date: string | undefined) =>
    date ? new Date(date).toLocaleDateString("sv-se") : "";
</script>

<svelte:head>
  <title>{article.title}</title>
  <meta name="description" content={article.sammanfattning} />
</svelte:head>

<Container class="mt-16 sm:mt-32">
  <article>
    <header class="flex flex-col">
      <h1
        class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
      >
        {article?.title}
      </h1>
      <time
        datetime={article.date_updated ?? article.date_created ?? ""}
        class="order-first flex items-center text-xs text-zinc-400 dark:text-zinc-500"
      >
        <span class="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        <span class="ml-3">{toDate(article?.date_updated ?? article?.date_created)}</span>
      </time>
      <TerapeutCard terapeut={article?.user_created} t={data.t} l={data.l} class="mb-8 pl-3" />
    </header>
    <div class="prose">
      <BlocksRender blocks={article.artikel?.blocks || []} />
    </div>
  </article>
</Container>
