<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import { getTitle, getAsset } from "$lib/widgets/util";
  import type { Link } from "$lib/api";
  import type { PageData } from "./$types";
  import SocialLink from "$lib/components/SocialLink.svelte";
  import Section from "$lib/components/Section.svelte";
  export let data: PageData;
  let links: Link[] = [];
  $: ({ t, l, terapeut } = data);
  $: links = (terapeut?.links || []).filter(Boolean) as Link[];
</script>

<svelte:head>
  <title>{terapeut.first_name}</title>
  <meta
    name="description"
    content={data.params.lang === "en"
      ? terapeut?.profil_sammanfattning_en
      : terapeut?.profil_sammanfattning}
  />
</svelte:head>

<Section>
  <Container>
    <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div class="lg:pl-20">
        <div class="max-w-xs px-2.5 lg:max-w-none">
          <img
            src={getAsset(terapeut.avatar?.filename_disk)}
            alt={terapeut.avatar?.title}
            sizes="(min-width: 1024px) 32rem, 20rem"
            class="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
          />
          <div class="mt-6 flex items-center justify-between space-x-24">
            <div>
              <h3
                class="text-tertiary-900 group-hover:text-tertiary-600 text-lg font-semibold leading-8 tracking-tight"
              >
                {terapeut.first_name}
                {terapeut.last_name}
              </h3>
              <p class="text-base leading-7 text-gray-600">
                {getTitle(terapeut.work_title || "", t)}
              </p>
            </div>
            <div>
              <a
                href={`${l("terapeuter")}/${terapeut.slug}/boka`}
                class="btn btn-sm variant-filled"
              >
                {t("common", "bokaNu")}
              </a>
            </div>
          </div>
          <ul class="border-1 mt-8 flex flex-col space-y-4 border-t pt-8">
            {#each links as link}
              <SocialLink
                {link}
                onlyIcon={false}
                class="text-tertiary-600 hover:text-tertiary-900 flex gap-x-4 text-sm leading-6"
              />
            {/each}
          </ul>
        </div>
      </div>
      <div class="lg:order-first lg:row-span-2">
        <article class="prose">
          <BlocksRender
            blocks={(data.params.lang === "en" ? terapeut.profil_text_en : terapeut.profil_text)
              ?.blocks || []}
          />
        </article>
      </div>
    </div>
  </Container>
</Section>
