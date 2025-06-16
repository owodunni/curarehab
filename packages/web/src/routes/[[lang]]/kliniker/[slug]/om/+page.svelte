<script lang="ts">
  import type { PageData } from "./$types";

  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { getTitle } from "$lib/widgets/util";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import ImageList, { type ImageType } from "$lib/components/ImageList.svelte";

  const { data }: { data: PageData } = $props();
  const { t, localized, l } = $derived(data);
  const lang = $derived(data.params.lang);
  const om = $derived(data.clinic);

  // Get clinic info for breadcrumb
  const clinicData = $derived(data?.data?.Kliniker_list?.[0]);
  const clinicTitle = $derived(
    localized(clinicData?.klinik_page?.title, clinicData?.klinik_page?.title_en) || "Klinik"
  );

  // Filter and map therapists for this clinic
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

  <!-- Breadcrumb -->
  <Container>
    <Section>
      <div class="mb-6">
        <Breadcrumb
          items={[
            {
              title: t("kliniker", "title"),
              href: l("kliniker"),
            },
            {
              title: clinicTitle,
              href: `${l("kliniker")}/${data.params.slug}`,
            },
            {
              title: localized(om?.title, om?.title_en) || t("kliniker", "omTitle"),
              current: true,
            },
          ]}
          {l} />
      </div>
    </Section>
  </Container>

  <Section>
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="mx-auto lg:pt-20">
          <div class="lg:max-w-lg">
            {#if om?.omslagsbild}
              <Image
                class="h-full w-full rounded-2xl object-cover"
                alt={om.omslagsbild?.title || ""}
                height={800}
                srcPath={om.omslagsbild?.filename_disk || ""}
                width={800} />
            {/if}
          </div>
        </div>
        <div>
          <div
            class="prose text-theme-body hyphens-auto text-base leading-7"
            lang={t("common", "lang")}>
            <BlocksRender blocks={(lang === "en" ? om.text_en : om.text)?.blocks || []} />
          </div>
          {#if users.length > 0}
            <ImageList images={users} />
          {/if}
        </div>
      </div>
    </Container>
  </Section>
{/if}
