<script lang="ts">
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { getTitle } from "$lib/widgets/util";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import ImageList from "$lib/components/ImageList.svelte";
  import type { ImageType } from "$lib/components/types";

  const { data }: { data: PageData } = $props();
  const { t, l } = $derived(data);
  const lang = $derived(data.params.lang);
  const om = $derived(data?.data?.om ?? undefined);
  const users = $derived(
    (data?.data?.terapeuter_directus_users || []).map(
      ({ directus_users_id: user }) =>
        ({
          href: `${l("terapeuter")}/${user?.slug}`,
          alt: user?.avatar?.title || "",
          srcPath: user?.avatar?.filename_disk || "",
          title: `${user?.first_name} ${user?.last_name}`,
          subTitle: getTitle(user?.work_title || "", t),
        }) satisfies ImageType
    )
  );
</script>

{#if om}
  <Seo seo={lang === "en" ? om.seo_en : om.seo} />

  <Section>
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="mx-auto lg:pt-20">
          <div class="lg:max-w-lg">
            <Image
              class="h-full w-full rounded-2xl object-cover"
              alt={om.omslags_bild?.title || ""}
              height={800}
              srcPath={om.omslags_bild?.filename_disk || ""}
              width={800} />
          </div>
        </div>
        <div>
          <div
            class="prose text-theme-body hyphens-auto text-base leading-7"
            lang={t("common", "lang")}>
            <BlocksRender blocks={(lang === "en" ? om.text_en : om.text)?.blocks || []} />
          </div>
          <ImageList images={users} />
        </div>
      </div>
    </Container>
  </Section>
{/if}
