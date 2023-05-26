<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import { getTitle } from "$lib/widgets/util";
  import type { PageData } from "./$types";
  export let data: PageData;
  const { lang, terapheut, t, l } = data;
</script>

<svelte:head>
  <title>{terapheut.first_name}</title>
  <meta name="description" content={terapheut.profile_excerpt} />
</svelte:head>

<Container class="mt-16 sm:mt-32">
  <div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
    <div class="lg:pl-20">
      <div class="max-w-xs px-2.5 lg:max-w-none">
        <img
          src={terapheut.profile_photo}
          alt=""
          sizes="(min-width: 1024px) 32rem, 20rem"
          class="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
        />
        <div class="mt-6">
          <h3
            class="text-tertiary-900 group-hover:text-tertiary-600 text-lg font-semibold leading-8 tracking-tight"
          >
            {terapheut.first_name}
            {terapheut.last_name}
          </h3>
          <p class="text-base leading-7 text-gray-600">{getTitle(terapheut.title, t)}</p>
          <div class="mt-6 w-24">
            <a
              href={`${l("terapeuter")}/${terapheut.first_name}-${terapheut.id}/boka`}
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
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html lang === "en" ? terapheut.profile_text_en : terapheut.profile_text}
      </article>
    </div>
  </div>
</Container>
