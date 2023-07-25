<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { behandlingar } from "$lib/i18n/en/behandlingar";
  import { building } from "__sveltekit/environment";
  import { terapeuter } from "$lib/i18n/en/terapeuter";
  export let data: PageData;

  $: ({ t, behandling } = data);
  $: console.log(behandling);
</script>

<Seo seo={data.params.lang === "en" ? behandling?.seo_en : behandling?.seo} />
<Section extras="theme-sand-dark">
  <Container>
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <Image
            srcPath={behandling?.bild?.filename_disk || ""}
            alt={behandling?.bild?.title || ""}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 32rem, 20rem"
            class="aspect-square rounded-2xl  object-cover"
          />
          <div class="mt-6 flex items-center justify-between space-x-24">
            <div>
              <h3
                class="text-skog-900 group-hover:text-skog-700 text-lg font-medium leading-8 tracking-tight"
              >
                {data.params.lang === "en" ? behandling?.Title_en : behandling?.Title}
              </h3>
              <p class="text-skog-700 text-base leading-7">
                {t("behandlingar", "pris")}
                {behandling.pris} kr
              </p>
            </div>
            <div>
              <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled">
                {t("common", "bokaNu")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <article class="prose">
          <BlocksRender
            blocks={(data.params.lang === "en"
              ? behandling?.behandling_text_en
              : behandling?.behandling_text
            )?.blocks || []}
          />
        </article>
      </div>
    </div>
  </Container>
</Section>
