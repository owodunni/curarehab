<script lang="ts">
  import type { SeoMetaData, Image as ImageType, Link } from "$lib/api";
  import Container from "./Container.svelte";
  import BlocksRender from "./EditorJs/BlocksRender.svelte";
  import type { Block } from "./EditorJs/types";
  import Section from "./Section.svelte";
  import Seo from "./Seo.svelte";
  import Image from "./Image.svelte";
  import type { T } from "$lib/i18n/t";
  import SocialLink from "./SocialLink.svelte";
  import type { Snippet } from "svelte";

  const {
    data,
    t,
    children,
    extraChildren,
  }: {
    data:
      | {
          text?: { blocks?: Block[] } | null;
          text_en?: { blocks?: Block[] } | null;
          seo?: SeoMetaData | null;
          seo_en?: SeoMetaData | null;
          image?: ImageType | null;
          links?: Link[] | null;
        }
      | null
      | undefined;
    t: T;
    children?: Snippet;
    extraChildren?: Snippet;
  } = $props();

  const lang = $derived(t("common", "lang"));
</script>

{#if data}
  <Seo seo={lang === "en" ? data.seo_en : data.seo} />

  <Section extras="theme-sand-dark">
    <Container>
      <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div class="lg:pl-20">
          <div class="max-w-xs px-2.5 lg:max-w-none">
            {#if data.image}
              <Image
                class="aspect-square rounded-2xl  object-cover"
                alt={data.image?.title || ""}
                height={800}
                sizes="(min-width: 1024px) 32rem, 20rem"
                srcPath={data.image?.filename_disk || ""}
                width={800} />
            {/if}
            {@render children?.()}
            {#if data.links}
              <ul
                class={`border-1 mt-8 flex flex-col space-y-4 ${data.image ? "border-t" : ""} pt-8`}>
                {#each data.links || [] as link (link.link)}
                  <SocialLink
                    class="text-skog-700 hover:text-skog-900 flex gap-x-4 text-sm leading-6"
                    {link}
                    onlyIcon={false} />
                {/each}
              </ul>
            {/if}
            {@render extraChildren?.()}
          </div>
        </div>
        <div class="lg:order-first lg:row-span-2">
          <article class="prose">
            <BlocksRender blocks={(lang === "en" ? data.text_en : data.text)?.blocks || []} />
          </article>
        </div>
      </div>
    </Container>
  </Section>
{/if}
