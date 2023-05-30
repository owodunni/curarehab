<script lang="ts">
  import type { L, T } from "$lib/i18n/t";
  import type { PageData } from "../../routes/[[lang]]/$houdini";
  import { getTitle } from "./util";

  export let l: L;
  export let t: T;
  export let store: PageData["ArticlesAndTerapeuts"];
  export let showExcerpt = false;
  export let lang = "sv";

  $: terapheuts = ($store.data?.terapeuter_directus_users || [])?.map((a) => a.directus_users_id);
</script>

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {t("common", "terapheutsTitle")}
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        {t("common", "terapheutsText")}
      </p>
    </div>
    <ul
      class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {#each terapheuts as terapheut}
        {console.log(terapheut)}
        <li>
          <a href={`${l("terapeuter")}/${terapheut?.slug}`} class="group">
            {#if terapheut?.avatar}
              <img
                class="aspect-[3/2] w-full rounded-2xl object-cover"
                src={`https://jardoole.xyz/assets/${terapheut.avatar.id}`}
                alt=""
              />
            {/if}
            <div class="mt-6 flex justify-between">
              <div>
                <h3
                  class="text-tertiary-900 group-hover:text-tertiary-600 text-lg font-semibold leading-8 tracking-tight"
                >
                  {terapheut?.first_name}
                  {terapheut?.last_name}
                </h3>
                <p class="text-base leading-7 text-gray-600">{getTitle(terapheut.title, t)}</p>
              </div>
              <div>
                <a
                  href={`${l("terapeuter")}/${terapheut?.slug}`}
                  class="btn btn-sm variant-filled hidden sm:block"
                >
                  {t("common", "bokaNu")}
                </a>
              </div>
            </div>
            {#if showExcerpt}
              <article class="prose mt-5">
                <!-- eslint-disable svelte/no-at-html-tags -->
                {@html lang === "sv" ? terapheut.profile_excerpt : terapheut.profile_excerpt_en}
              </article>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
