<script lang="ts">
  import Container from "$lib/components/Container.svelte";
  import type { ActionData, PageData } from "./$types";
  import { marked } from "marked";
  import { ChevronDownIcon, ChevronUpIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { page } from "$app/stores";

  export let data: PageData;
  export let form: ActionData;

  const { t, post, parent } = data;
  let postData = post?.post ?? "";

  $: editedHtml = marked.parse(postData);
  let preview = false;
  const q = [
    `parent=${$page.url.searchParams.get("parent")}`,
    `post=${$page.url.searchParams.get("post")}`
  ]
    .filter((x) => !x.includes("=null"))
    .join("&");
</script>

<Container class="pb-16">
  <button class="btn variant-filled" on:click={() => (preview = !preview)}>
    Preview
    {#if preview}
      <span class="ml-2"><ChevronUpIcon class="h-4 w-4" /></span>
    {:else}
      <span class="ml-2"><ChevronDownIcon class="h-4 w-4" /></span>
    {/if}
  </button>
  {#if preview}
    <article class="prose border-b pb-16">
      <!-- eslint-disable svelte/no-at-html-tags -->
      {@html editedHtml}
    </article>
  {/if}
  {#if form?.slugMissing}
    <p class="text-sm text-red-500">Slug is required!</p>
  {:else if form?.titleMissing}
    <p class="text-sm text-red-500">Title is required!</p>
  {:else if form?.error}
    <p class="text-sm text-red-500">{form?.error.message}</p>
  {/if}
  <div class="space-y-12">
    <form id="editForm" method="POST" action={`?/${post ? "update" : "create"}&${q}`}>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="title" class="text-tertiary-900 block text-sm font-medium leading-6"
            >Title</label
          >
          <div class="mt-2">
            <div
              class="ring-surface-300 focus-within:ring-surface-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md"
            >
              <input
                type="text"
                name="title"
                id="title"
                required={true}
                class="text-tertiary-900 placeholder:text-tertiary-400 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Lorem ipsum dolor."
                value={post?.title || ""}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="publish" class="text-tertiary-900 block text-sm font-medium leading-6"
            >Publish</label
          >
          <div class="mt-2">
            <input
              type="checkbox"
              name="publish"
              id="publish"
              class="text-surface-600"
              placeholder="Lorem ipsum dolor."
              checked={post?.published === true}
            />
          </div>
        </div>
        {#if parent}
          <div class="sm:col-span-4">
            <label for="parent_title" class="text-tertiary-900 block text-sm font-medium leading-6"
              >Parent</label
            >
            <div class="mt-2">
              <div
                class="ring-surface-300 focus-within:ring-surface-600 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md"
              >
                <input
                  type="text"
                  disabled={true}
                  name="parent_title"
                  id="parent_title"
                  class="text-tertiary-700 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                  value={parent.title}
                />
                <input
                  type="text"
                  disabled={true}
                  name="parent_id"
                  id="parent_id"
                  class="hidden"
                  value={parent.id}
                />
              </div>
            </div>
          </div>
        {/if}

        <div class="col-span-full">
          <label for="slug" class="text-tertiary-900 block text-sm font-medium leading-6 underline"
            ><a href="https://developer.mozilla.org/en-US/docs/Glossary/Slug">Slug</a></label
          >
          <div
            class=" ring-surface-300 focus-within:ring-surface-600 mt-2 flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset sm:max-w-md"
          >
            <input
              type="text"
              id="slug"
              name="slug"
              placeholder="lorem"
              required={true}
              pattern="^[a-zA-Z0-9\-._~]+$"
              class="text-tertiary-700 block flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
              value={post?.slug || ""}
            />
          </div>
        </div>

        <div class="col-span-4">
          <label for="excerpt" class="text-tertiary-900 block text-sm font-medium leading-6"
            >Sammanfattning</label
          >
          <div class="mt-2">
            <textarea
              id="excerpt"
              name="excerpt"
              rows="3"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
              class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
              value={post?.excerpt || ""}
            />
          </div>
        </div>
        <div class="col-span-4">
          <label for="post" class="text-tertiary-900 block text-sm font-medium leading-6"
            >Artikel</label
          >
          <textarea
            name="post"
            id="post"
            class="text-tertiary-900 ring-surface-300 placeholder:text-tertiary-400 focus:ring-surface-600 block h-96 w-full rounded-md border-0 bg-transparent shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:py-1.5 sm:text-sm sm:leading-6"
            bind:value={postData}
            placeholder="Markdown"
          />
        </div>
      </div>
    </form>
    <button class="btn variant-filled" type="submit" form="editForm"
      >{post ? t("common", "save") : t("common", "create")}</button
    >
  </div>
</Container>
