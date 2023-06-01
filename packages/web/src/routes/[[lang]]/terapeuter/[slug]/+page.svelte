<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import BlocksRender from "$lib/components/EditorJs/BlocksRender.svelte";
  import { getTitle, getAsset } from "$lib/widgets/util";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { t, l, terapeut } = data;
</script>

<svelte:head>
  <title>{terapeut.first_name}</title>
  <meta name="description" content={terapeut.description} />
</svelte:head>

<Container class="mt-16 sm:mt-32">
  <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
    <div class="lg:pl-20">
      <div class="max-w-xs px-2.5 lg:max-w-none">
        <img
          src={getAsset(terapeut.avatar?.id)}
          alt={terapeut.avatar?.title}
          sizes="(min-width: 1024px) 32rem, 20rem"
          class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
        />
        <div class="mt-6">
          <h3
            class="text-tertiary-900 group-hover:text-tertiary-600 text-lg font-semibold leading-8 tracking-tight"
          >
            {terapeut.first_name}
            {terapeut.last_name}
          </h3>
          <p class="text-base leading-7 text-gray-600">{getTitle(terapeut.work_title || "", t)}</p>
          <div class="mt-6 w-24">
            <a
              href={`${l("terapeuter")}/${terapeut.slug}/boka`}
              class="btn btn-sm variant-filled hidden sm:block"
            >
              {t("common", "bokaNu")}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:order-first lg:row-span-2">
      <article class="prose">
        <BlocksRender blocks={terapeut.profil_text?.blocks || []} />
      </article>
    </div>
  </div>
</Container>
