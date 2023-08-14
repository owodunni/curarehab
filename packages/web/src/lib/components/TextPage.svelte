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

  export let data:
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
  export let t: T;
  let lang: string;
  $: lang = t("common", "lang");
</script>

{#if data}
  <Seo seo={lang === "en" ? data.seo_en : data.seo} />

  <Section extras="theme-sand-dark">
    <Container>
      <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {#if data.image}
          <div class="lg:pl-20">
            <div class="max-w-xs px-2.5 lg:max-w-none">
              <Image
                srcPath={data.image?.filename_disk || ""}
                alt={data.image?.title || ""}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 32rem, 20rem"
                class="aspect-square rounded-2xl  object-cover"
              />
              <div class="mt-6 flex items-start justify-between">
                <div>
                  <slot />
                </div>
                <div>
                  <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled">
                    {t("common", "bokaNu")}
                  </a>
                </div>
              </div>
              {#if data.links}
                <ul class="border-1 mt-8 flex flex-col space-y-4 border-t pt-8">
                  {#each data.links || [] as link}
                    <SocialLink
                      {link}
                      onlyIcon={false}
                      class="text-skog-700 hover:text-skog-900 flex gap-x-4 text-sm leading-6"
                    />
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        {/if}
        <div class="lg:order-first lg:row-span-2">
          <article class="prose">
            <BlocksRender blocks={(lang === "en" ? data.text_en : data.text)?.blocks || []} />
          </article>
        </div>
      </div>
    </Container>
  </Section>
{/if}
