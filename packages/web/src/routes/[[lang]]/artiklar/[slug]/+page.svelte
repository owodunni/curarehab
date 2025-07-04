<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import Section from "$lib/components/Section.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Image from "$lib/components/Image.svelte";
  import TerapeutCard from "$lib/components/TerapeutCard.svelte";
  import type { PageData } from "./$types";
  import type { WithContext, NewsArticle, Person } from "schema-dts";
  import { getAsset2 } from "$lib/widgets/util";

  function userToPerson(
    user: PageData["article"]["user_created"] | PageData["article"]["user_updated"],
    language: PageData["article"]["language"]
  ): [Person] | [] {
    if (!user || !language) {
      return [];
    }
    if (user.slug === "admin-user") {
      return [];
    }
    return [
      {
        "@type": "Person",
        name: `${user.first_name} ${user.last_name}`,
        ...(user.email && { email: user.email }),
        url: `https://curarehab.se/${language === "sv" ? "" : "en/"}terapeuter/${user.slug}`,
      },
    ];
  }

  const { data }: { data: PageData } = $props();
  const { article } = $derived(data);

  let ldJson = $state<WithContext<NewsArticle> | undefined>(undefined);

  $effect(() => {
    if (article) {
      ldJson = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        dateCreated: article.date_created,
        dateModified: article.date_updated,
        datePublished: article.date_created,
        ...(article.title && { headline: article.title, name: article.title }),
        publisher: {
          "@type": "Organization",
          url: "https://curarehab.se",
          email: "info@curarehab.se",
          name: "CuraRehab",
          legalName: "CuraRehab Linköping AB",
        },
        ...(article.sammanfattning && { description: article.sammanfattning }),
        author: [
          ...userToPerson(article.user_created, article.language),
          ...(article.user_created?.slug !== article.user_updated?.slug
            ? userToPerson(article.user_updated, article.language)
            : []),
        ],
        url: `https://curarehab.se/${article.language === "sv" ? "" : "en/"}artiklar/${article.slug}`,
        image: {
          "@type": "ImageObject",
          url: getAsset2(article?.omslagsbild?.filename_disk ?? "", {
            width: 800,
            height: 450,
            format: "jpg",
            quality: 80,
          }),
          width: "800",
          height: "450",
        },
      };
    } else {
      ldJson = undefined;
    }
  });
</script>

<Seo {ldJson} seo={article?.seo} />

<Section extras="py-0 pb-20 sm:pb-32">
  <Container>
    <article>
      <header class="mb-8 flex w-full max-w-xl flex-col">
        <h1
          class="mb-8 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {article?.title}
        </h1>
        <p class="text-theme-heading text-xl-summary md:text-2xl-summary">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html article?.sammanfattning}
        </p>
        <TerapeutCard
          class="border-1 border-b-sand-300 mb-8 border-t pl-3 pt-4"
          l={data.l}
          t={data.t}
          terapeut={article?.user_created}
          time={article?.date_updated ?? article?.date_created ?? ""} />
        <div class="relative mb-8">
          <Image
            class="aspect-[16/9] rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            alt={article?.omslagsbild?.title || ""}
            height={450}
            srcPath={article?.omslagsbild?.filename_disk ?? ""}
            width={800} />
        </div>
      </header>
      <div class="prose">
        <BlocksRender blocks={article.artikel?.blocks || []} />
      </div>
    </article>
  </Container>
</Section>
