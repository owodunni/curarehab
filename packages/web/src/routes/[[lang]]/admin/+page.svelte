<script lang="ts">
  import { Button, Container, HeroComponent } from "$lib/components";
  import { EditBlogDialog } from "$lib/components";
  import { PencilIcon, PlusSmIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { EyeIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { t } from "$lib/i18n";
  import type { PageData } from "./$types";
  import type { BlogPostMetaData } from "$lib/api";

  export let data: PageData;
  const posts = data.blogPosts;
  let showDialog = false;

  let selectedPost: BlogPostMetaData | undefined = undefined;
  let parentPost: BlogPostMetaData | undefined = undefined;

  function showEditCreatePostDialog({
    post,
    parent
  }: {
    post?: BlogPostMetaData;
    parent?: BlogPostMetaData;
  }) {
    selectedPost = post;
    parentPost = parent;
    showDialog = true;
  }

  function closeDialog() {
    console.log("closeDialog");
    showDialog = false;
    selectedPost = undefined;
    parentPost = undefined;
  }
</script>

<EditBlogDialog
  {showDialog}
  supabase={data.supabase}
  user={data.user}
  post={selectedPost}
  parent={parentPost}
  on:close={closeDialog}
/>
<HeroComponent>
  <div class="flex h-full max-w-sm flex-col lg:w-96">
    <h2 class="flex-1 text-4xl font-bold tracking-tight text-gray-900">
      {$t("admin", "welcome", { default: data.user.email })}
    </h2>
  </div>
</HeroComponent>
<Container>
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">{$t("admin", "blogPosts")}</h1>
      <p class="mt-2 text-sm text-gray-700">{$t("admin", "tableDescription")}</p>
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
      <Button on:click={() => (showDialog = true)}>{$t("admin", "newBlogPost")}</Button>
    </div>
  </div>
  <div class="mt-8 flow-root">
    <div class="inline-block min-w-full py-2 align-middle">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Id</th
            >
            <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >{$t("admin", "tableTitle")}</th
            >
            <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >{$t("admin", "tableParent")}</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each posts as post}
            <tr>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >{post.id}</td
              >
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{post.title}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{post.parent ?? "-"}</td
              >
              <td class="relative flex py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-1">
                <Button href={post.link}><EyeIcon class="h-4 w-4" /></Button>
                <Button variant="outline" on:click={() => showEditCreatePostDialog({ post })}
                  ><PencilIcon class="h-4 w-4" /></Button
                >
                <Button
                  variant="outline"
                  on:click={() => showEditCreatePostDialog({ parent: post })}
                  ><PlusSmIcon class="h-4 w-4" /></Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Container>
