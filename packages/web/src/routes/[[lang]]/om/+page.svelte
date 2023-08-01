<script lang="ts">
  import type { PageData } from "./$types";
  import Section from "$lib/components/Section.svelte";
  import Container from "$lib/components/Container.svelte";
  import Image from "$lib/components/Image.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import { getTitle } from "$lib/widgets/util";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  export let data: PageData;
  $: ({ t, l } = data);
  let lang = data.params.lang;
  let om = data?.data?.om ?? undefined;
  $: om = data?.data?.om ?? undefined;
  $: lang = data.params.lang;
</script>

{#if om}
  <Seo seo={lang === "en" ? om.seo : om.seo_en} />

  <Section>
    <Container>
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="m-auto lg:pr-4">
          <div class="lg:max-w-lg">
            <Image
              srcPath={om.omslags_bild?.filename_disk || ""}
              alt={om.omslags_bild?.title || ""}
              width={800}
              height={800}
              class="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
        <div>
          <div class="prose text-base leading-7 text-gray-700">
            <BlocksRender blocks={(lang === "en" ? om.text_en : om.text)?.blocks || []} />
          </div>
          <ul
            class="border-theme-div mt-10 grid grid-cols-2 gap-8 border-t pt-10 text-center sm:grid-cols-3"
          >
            {#if data?.data?.terapeuter_directus_users}
              {#each data?.data?.terapeuter_directus_users || [] as { directus_users_id }}
                <li>
                  <a href={`${l("terapeuter")}/${directus_users_id?.slug}`} class="group">
                    <Image
                      srcPath={directus_users_id?.avatar?.filename_disk || ""}
                      alt={directus_users_id?.avatar?.title || ""}
                      width={64}
                      height={64}
                      class="mx-auto h-24 w-24 rounded-full"
                    />

                    <h3
                      class="text-theme-heading group-hover:text-theme-muted-hover mt-6 text-base font-medium leading-7 tracking-tight"
                    >
                      {directus_users_id?.first_name}
                      {directus_users_id?.last_name}
                    </h3>
                    <p class="text-theme-muted text-sm leading-6">
                      {getTitle(directus_users_id?.work_title || "", t)}
                    </p>
                  </a>
                </li>
              {/each}
            {/if}
          </ul>
        </div>
      </div>
    </Container>
  </Section>
{/if}
