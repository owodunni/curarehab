<script lang="ts">
  import TextPage from "./TextPage.svelte";
  import type { SeoMetaData, Image as ImageType, Link } from "$lib/api";
  import type { Block } from "./EditorJs/types";
  import type { T } from "$lib/i18n/t";
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
</script>

<TextPage {data} {t}>
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
</TextPage>
