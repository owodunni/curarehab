<script lang="ts">
  import TextPage from "./TextPage.svelte";
  import type { SeoMetaData, Image as ImageType, Link } from "$lib/api";
  import type { Block } from "./EditorJs/types";
  import type { T } from "$lib/i18n/t";
  import type { Snippet } from "svelte";

  const { data, t, children, extraChildren } = $props<{
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
  }>();
</script>

<TextPage {data} {extraChildren} {t}>
  <div class="mt-6 flex items-start justify-between">
    <div>
      {@render children?.()}
    </div>
    <div>
      <a class="btn btn-sm variant-filled" href={t("common", "hanoLink")}>
        {t("common", "bokaNu")}
      </a>
    </div>
  </div>
</TextPage>
