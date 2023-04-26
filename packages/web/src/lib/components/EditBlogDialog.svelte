<script lang="ts">
  import Modal from "./Modal.svelte";
  import { createEventDispatcher } from "svelte";
  import { t } from "$lib/i18n";
  import type { SupabaseLightClient, User, BlogPostMetaData } from "@curarehab/api";
  import { Button } from ".";
  import { goto } from "$app/navigation";

  export let showDialog = false;
  export let supabase: SupabaseLightClient;
  export let user: User;
  export let post: BlogPostMetaData | undefined = undefined;
  export let parent: BlogPostMetaData | undefined = undefined;

  let submitted = false;
  let closing = false;

  const dispatch = createEventDispatcher();
  function close() {
    closing = true;
    dispatch("close", {});
  }

  async function handleSubmit(e: Event) {
    if (closing) return;
    const formData = new FormData(e.target as HTMLFormElement);
    if (post) {
      const res = await supabase.s
        .from("blog")
        .update({
          title: formData.get("title") as string,
          excerpt: formData.get("excerpt") as string,
          slug: formData.get("slug") as string,
          published: formData.get("publish") === "on",
          updated_at: new Date().toISOString()
        })
        .eq("id", post.id);
      console.log("res", res);
      if (res.error) {
        console.error(res.error);
      } else {
        window.location.reload();
      }
    } else {
      const res = await supabase.s
        .from("blog")
        .insert([
          {
            title: formData.get("title") as string,
            excerpt: formData.get("excerpt") as string,
            slug: formData.get("slug") as string,
            author: user.id,
            updated_at: new Date().toISOString(),
            ...(parent && { parent: parent.id }),
            locale: "sv"
          }
        ])
        .select("*")
        .single();
      if (res.error) {
        console.error(res.error);
      } else {
        const link = await supabase.util().getRouteToPost(res.data);
        if (typeof link === "string") {
          goto(link);
        } else {
          console.error(link);
        }
      }
    }
  }
</script>

<Modal open={showDialog}>
  <form action="#" class:submitted on:submit|preventDefault={handleSubmit}>
    <div class="space-y-12">
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
            <label for="parent" class="block text-sm font-medium leading-6 text-gray-900"
              >Parent</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  disabled={true}
                  name="parent"
                  id="parent"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 focus:ring-0 sm:text-sm sm:leading-6"
                  value={parent.title}
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

        <div class="col-span-full flex gap-2">
          <Button on:click={() => (submitted = true)} variant="outline" class="w-full"
            >{post ? $t("common", "save") : $t("common", "create")}</Button
          >
          <Button on:click={close} class="w-full">{$t("common", "cancel")}</Button>
        </div>
      </div>
    </div>
  </form>
</Modal>
