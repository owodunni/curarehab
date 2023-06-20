<script lang="ts">
  import { page } from "$app/stores";
  import type { L, T } from "$lib/i18n/t";
  import Image from "$lib/components/Image.svelte";
  import type { TerapeutsMetaDataQuery } from "src/routes/[[lang]]/terapeuter/$types.gql";
  import { getTitle } from "./util";

  export let l: L;
  export let t: T;
  export let terapheuts: TerapeutsMetaDataQuery["terapeuter_directus_users"];
</script>

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
  {#each terapheuts as { directus_users_id }}
    <li>
      <a href={`${l("terapeuter")}/${directus_users_id?.slug}`} class="group">
        <Image
          class="w-full rounded-2xl"
          srcPath={directus_users_id?.avatar?.filename_disk || ""}
          width={600}
          height={400}
          alt={directus_users_id?.avatar?.title || ""}
        />
        <div class="mt-6 flex justify-between">
          <div>
            <h3
              class="text-lg font-semibold leading-8 tracking-tight text-gray-900 group-hover:text-gray-600"
            >
              {directus_users_id?.first_name}
              {directus_users_id?.last_name}
            </h3>
            <p class="text-base leading-7 text-gray-600">
              {getTitle(directus_users_id?.work_title || "", t)}
            </p>
          </div>
          <div>
            <a href={t("common", "hanoLink")} class="btn btn-sm variant-filled hidden sm:block">
              {t("common", "bokaNu")}
            </a>
          </div>
        </div>
        <article class="prose mt-5">
          <p class="line-clamp-6">
            {$page.params.lang === "en"
              ? directus_users_id?.profil_sammanfattning_en
              : directus_users_id?.profil_sammanfattning}
          </p>
        </article>
      </a>
    </li>
  {/each}
</ul>
