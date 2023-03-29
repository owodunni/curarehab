<script lang="ts">
  import { Button, Container, HeroComponent } from "$lib/components";
  import { EditBlogDialog } from "$lib/components";
  import { PencilIcon, PlusSmIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { EyeIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { t } from "$lib/i18n";
  import type { PageData } from "./$types";

  export let data: PageData;
  const posts = data.blogPosts;
  let showDialog = false;
</script>

<EditBlogDialog supabase={data.supabase} user={data.user} {showDialog} />
<HeroComponent>
  <div class="flex h-full max-w-sm flex-col lg:w-96">
    <h2 class="flex-1 text-4xl font-bold tracking-tight text-gray-900">
      {$t("admin", "welcome", { default: data.user.email })}
    </h2>

    <div class="mt-14 flex gap-2">
      <Button class="w-full" variant="outline">{$t("admin", "logOut")}</Button>
    </div>
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
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >{$t("admin", "tableTitle")}</th
            >
            <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >{$t("admin", "tableExcerpt")}</th
            >
            <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              ><a href="https://developer.mozilla.org/en-US/docs/Glossary/Slug" class="underline"
                >{$t("admin", "tableSlug")}</a
              ></th
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
                >{post.title}</td
              >
              <td class="truncate whitespace-nowrap py-4 px-3 text-sm text-gray-500"
                >{post.excerpt}</td
              >
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{post.slug}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{post.parent}</td>
              <td
                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
              >
                <Button href={post.link}><EyeIcon class="h-4 w-4" /></Button>
                <Button variant="outline"><PencilIcon class="h-4 w-4" /></Button>
                <Button variant="outline"><PlusSmIcon class="h-4 w-4" /></Button>
              </td>
              <td class="relative" />
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Container>
