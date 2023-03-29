<script lang="ts">
  import type { SupabaseLightClient, User } from "$lib/api";
  import type { BlogPostMetaData } from "$lib/api/types";
  import { Button } from ".";
  import Modal from "./Modal.svelte";
  export let supabase: SupabaseLightClient;
  export let user: User;
  export let post: BlogPostMetaData | null = null;
  export let showDialog = false;

  let submitted = false;

  async function handleSubmit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await supabase.s.from("blog").insert([
      {
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string,
        post: formData.get("article") as string,
        slug: formData.get("slug") as string,
        author: user.id,
        updated_at: new Date().toISOString(),
        locale: "sv"
      }
    ]);
    if (res.error) {
      console.error(res.error);
    } else {
      showDialog = false;
      window.location.reload();
    }
  }
</script>
{#if showDialog}
<Modal>
  <form action="#" class:submitted on:submit|preventDefault={handleSubmit}>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Lorem ipsum dolor."
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="slug" class="block text-sm font-medium leading-6 text-gray-900">Slug</label>
            <div class="mt-2">
              <textarea
                id="slug"
                name="slug"
                rows="1"
                placeholder="Lorem"
                class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
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
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="article" class="block text-sm font-medium leading-6 text-gray-900"
              >Artikel</label
            >
            <div class="mt-2">
              <textarea
                id="article"
                name="article"
                rows="3"
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
                class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <Button variant="outline" class="w-full" on:click={() => (showDialog = false)}
          >Cancel</Button
        >
        <Button class="w-full" on:click={() => (submitted = true)}>Create</Button>
      </div>
    </div>
  </form>
</Modal>
{/if}
