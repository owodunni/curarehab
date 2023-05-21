<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import type { ActionData, PageData } from "./$types";
  import { marked } from "marked";
  import { ChevronDownIcon, ChevronUpIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { page } from "$app/stores";

  export let data: PageData;
  export let form: ActionData;

  const { t, terapheut } = data;

  let profileData = terapheut?.profile_text ?? "";
  let excerptData = terapheut?.profile_excerpt ?? "";
  let profileEnData = terapheut?.profile_text_en ?? "";
  let excerptEnData = terapheut?.profile_excerpt_en ?? "";

  $: profileHtml = marked.parse(profileData);
  $: excerptHtml = marked.parse(excerptData);
  $: profileEnHtml = marked.parse(profileEnData);
  $: excerptEnHtml = marked.parse(excerptEnData);
  let preview = false;
  let previewExcerpt = false;
  let previewEn = false;
  let previewExcerptEn = false;
  const q = [`id=${$page.url.searchParams.get("id")}`]
    .filter((x) => !x.includes("=null"))
    .join("&");
</script>

<Container class="pb-16">
  <div class="flex flex-col space-y-8" />
  {#if form?.idMissing}
    <p class="text-sm text-red-500">Id is required!</p>
  {:else if form?.error}
    <p class="text-sm text-red-500">{form?.error.message}</p>
  {/if}
  <div class="space-y-12">
    <form id="editForm" method="POST" action={`?/update&${q}`}>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="col-span-2">
          <label for="first_name" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineFirstName")}</label
          >
          <div class="mt-2">
            <div
              class="ring-surface-300 focus-within:ring-surface-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md"
            >
              <input
                type="text"
                name="first_name"
                id="first_name"
                required={true}
                class="text-tertiary-900 placeholder:text-tertiary-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Lorem ipsum dolor."
                value={terapheut?.first_name || ""}
              />
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <label for="last_name" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineLastName")}</label
          >
          <div class="mt-2">
            <div
              class="ring-surface-300 focus-within:ring-surface-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md"
            >
              <input
                type="text"
                name="last_name"
                id="last_name"
                required={true}
                class="text-tertiary-900 placeholder:text-tertiary-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Lorem ipsum dolor."
                value={terapheut?.last_name || ""}
              />
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <label for="publish" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlinePublish")}</label
          >
          <div class="mt-2">
            <input
              type="checkbox"
              name="published"
              id="published"
              class="text-surface-600"
              placeholder="Lorem ipsum dolor."
              checked={terapheut?.published === true}
            />
          </div>
        </div>
        <div class="col-span-4">
          <label for="profile_excerpt" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineExcerpt")}</label
          >
          <div class="mt-2">
            <textarea
              id="profile_excerpt"
              name="profile_excerpt"
              rows="3"
              placeholder="Markdown"
              class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
              bind:value={excerptData}
            />
          </div>
        </div>
        <button
          class="btn variant-filled col-span-4"
          type="button"
          on:click={() => (previewExcerpt = !previewExcerpt)}
        >
          {t("admin", "previewExcerpt")}
          {#if preview}
            <span class="ml-2"><ChevronUpIcon class="h-4 w-4" /></span>
          {:else}
            <span class="ml-2"><ChevronDownIcon class="h-4 w-4" /></span>
          {/if}
        </button>
        {#if previewExcerpt}
          <article class="prose col-span-4 pb-16">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html excerptHtml}
          </article>
        {/if}
        <div class="col-span-4">
          <label for="profile_text" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineProfile")}</label
          >
          <textarea
            name="profile_text"
            id="profile_text"
            class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block h-96 w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
            bind:value={profileData}
            placeholder="Markdown"
          />
        </div>
        <button
          class="btn variant-filled col-span-4"
          type="button"
          on:click={() => (preview = !preview)}
        >
          {t("admin", "previewProfile")}
          {#if preview}
            <span class="ml-2"><ChevronUpIcon class="h-4 w-4" /></span>
          {:else}
            <span class="ml-2"><ChevronDownIcon class="h-4 w-4" /></span>
          {/if}
        </button>
        {#if preview}
          <article class="prose col-span-4 pb-16">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html profileHtml}
          </article>
        {/if}
        <div class="col-span-4">
          <label
            for="profile_excerpt_en"
            class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineExcerpt")} (en)</label
          >
          <div class="mt-2">
            <textarea
              id="profile_excerpt_en"
              name="profile_excerpt_en"
              rows="3"
              placeholder="Markdown"
              class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
              bind:value={excerptEnData}
            />
          </div>
        </div>
        <button
          class="btn variant-filled col-span-4"
          type="button"
          on:click={() => (previewExcerptEn = !previewExcerptEn)}
        >
          {t("admin", "previewExcerpt")} (en)
          {#if preview}
            <span class="ml-2"><ChevronUpIcon class="h-4 w-4" /></span>
          {:else}
            <span class="ml-2"><ChevronDownIcon class="h-4 w-4" /></span>
          {/if}
        </button>
        {#if previewExcerptEn}
          <article class="prose col-span-4 pb-16">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html excerptEnHtml}
          </article>
        {/if}
        <div class="col-span-4">
          <label for="profile_text_en" class="text-tertiary-900 block text-sm font-medium leading-6"
            >{t("admin", "headlineProfile")} (en)</label
          >
          <textarea
            name="profile_text_en"
            id="profile_text_en"
            class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block h-96 w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
            bind:value={profileEnData}
            placeholder="Markdown"
          />
        </div>
        <button
          class="btn variant-filled col-span-4"
          type="button"
          on:click={() => (previewEn = !previewEn)}
        >
          {t("admin", "previewProfile")} (en)
          {#if previewEn}
            <span class="ml-2"><ChevronUpIcon class="h-4 w-4" /></span>
          {:else}
            <span class="ml-2"><ChevronDownIcon class="h-4 w-4" /></span>
          {/if}
        </button>
        {#if previewEn}
          <article class="prose col-span-4 pb-16">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html profileEnHtml}
          </article>
        {/if}
      </div>
    </form>
    <button class="btn variant-filled" type="submit" form="editForm">{t("common", "save")}</button>
  </div>
</Container>
