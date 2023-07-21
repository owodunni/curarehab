<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Image from "$lib/components/Image.svelte";
  import TerapeutCard from "$lib/components/TerapeutCard.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ article } = data);
</script>

<Seo seo={article?.seo} />

<Section extras="py-0 pb-20 sm:pb-32">
  <Container>
    <article>
      <header class="border-1 border-b-moon-mist-300 mb-8 flex w-full max-w-xl flex-col border-b">
        <div class="relative mb-8">
          <Image
            srcPath={article?.omslagsbild?.filename_disk ?? ""}
            width={800}
            height={450}
            alt={article?.omslagsbild?.title || ""}
            class="aspect-[16/9] rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
          />
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {article?.title}
        </h1>
        <TerapeutCard
          terapeut={article?.user_created}
          t={data.t}
          l={data.l}
          class="mb-8 pl-3"
          time={article?.date_updated ?? article?.date_created ?? ""}
        />
      </header>
      <div class="prose">
        <BlocksRender blocks={article.artikel?.blocks || []} />
      </div>
    </article>
  </Container>
</Section>
