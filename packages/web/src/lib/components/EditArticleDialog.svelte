<script lang="ts">
  import Modal from "./Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "$lib/i18n";
  import type { BlogPostMetaData } from "@curarehab/api";
  import { Button } from ".";

  export let showDialog = false;
  export let post: BlogPostMetaData | undefined = undefined;
  export let parent: BlogPostMetaData | undefined = undefined;

  const dispatch = createEventDispatcher();
  function close() {
    dispatch("close", {});
  }
</script>

<Modal open={showDialog}>
  <div class="space-y-12">
    <form id="editForm" method="POST" action={`?/${post ? "update" : "create"}`}>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <input
                type="text"
                name="title"
                id="title"
                required={true}
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Lorem ipsum dolor."
                value={post?.title || ""}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="publish" class="block text-sm font-medium leading-6 text-gray-900"
            >Publish</label
          >
          <div class="mt-2">
            <input
              type="checkbox"
              name="publish"
              id="publish"
              placeholder="Lorem ipsum dolor."
              checked={post?.published === true}
            />
          </div>
        </div>
        {#if parent}
          <div class="sm:col-span-4">
            <label for="parent_title" class="block text-sm font-medium leading-6 text-gray-900"
              >Parent</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  disabled={true}
                  name="parent_title"
                  id="parent_title"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 focus:ring-0 sm:text-sm sm:leading-6"
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
          <label for="slug" class="block text-sm font-medium leading-6 text-gray-900 underline"
            ><a href="https://developer.mozilla.org/en-US/docs/Glossary/Slug">Slug</a></label
          >
          <div
            class=" mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
          >
            <input
              type="text"
              id="slug"
              name="slug"
              placeholder="lorem"
              required={true}
              pattern="^[a-zA-Z0-9\-._~]+$"
              class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 focus:ring-0 sm:text-sm sm:leading-6"
              value={post?.slug || ""}
            />
          </div>
        </div>

        <div class="col-span-full">
          <label for="excerpt" class="block text-sm font-medium leading-6 text-gray-900"
            >Sammanfattning</label
          >
          <div class="mt-2">
            <textarea
              id="excerpt"
              name="excerpt"
              rows="3"
              placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
              class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              value={post?.excerpt || ""}
            />
          </div>
        </div>
      </div>
    </form>
    <div class="col-span-full flex gap-2">
      <Button variant="outline" class="w-full" type="submit" form="editForm"
        >{post ? $t("common", "save") : $t("common", "create")}</Button
      >
      <Button on:click={close} class="w-full">{$t("common", "cancel")}</Button>
    </div>
  </div>
</Modal>
