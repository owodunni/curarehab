<script lang="ts">
  import type { SeoMetaData } from "$lib/api";
  import Container from "./Container.svelte";
  import BlocksRender from "./EditorJs/BlocksRender.svelte";
  import type { Block } from "./EditorJs/types";
  import Section from "./Section.svelte";
  import Seo from "./Seo.svelte";

  export let data:
    | {
        text?: { blocks?: Block[] } | null;
        text_en?: { blocks?: Block[] } | null;
        seo?: SeoMetaData | null;
        seo_en?: SeoMetaData | null;
      }
    | null
    | undefined;
  export let lang: string | undefined;
</script>

{#if data}
  <Section>
    <Container>
      <div class="prose mx-auto max-w-2xl lg:mx-0">
        <BlocksRender blocks={(lang === "en" ? data.text_en : data.text)?.blocks || []} />
      </div>
    </Container>
  </Section>

  <Seo seo={lang === "en" ? data.seo : data.seo_en} />
{/if}
