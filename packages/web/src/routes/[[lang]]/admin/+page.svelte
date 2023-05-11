<script lang="ts">
  import { PencilIcon, PlusSmIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { EyeIcon } from "@rgossiaux/svelte-heroicons/solid";
  import type { PageData } from "./$types";
  import type { BlogPostMetaData } from "@curarehab/api";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import HeroComponent from "$lib/components/HeroComponent.svelte";
  import Container from "$lib/components/Container.svelte";

  export let data: PageData;
  const posts = data.blogPosts;

  function linkToEditArticle({
    post,
    parent
  }: {
    post?: BlogPostMetaData;
    parent?: BlogPostMetaData;
  } = {}) {
    const prefix = $page.params.lang ? `/${$page.params.lang}` : "";
    const querryParams = [
      parent?.slug ? `parent=${parent.slug}` : "",
      post?.slug ? `post=${post.slug}` : ""
    ]
      .filter(Boolean)
      .join("&");
    return `${prefix}/admin/artiklar${querryParams.length > 0 ? `?${querryParams}` : ""}`;
  }
  const { t } = data;
</script>

<!--EditArticleDialog {showDialog} post={selectedPost} parent={parentPost} on:close={closeDialog} /-->
<HeroComponent {t}>
  <div class="flex h-full max-w-sm flex-col lg:w-96">
    <h2 class="flex-1 text-4xl font-bold tracking-tight text-gray-900">
      {t("admin", "welcome", { name: data.user.email || "" })}
      <form method="post" action="/admin/login?/logout" use:enhance>
        <button class="btn variant-filled">{t("common", "logout")}</button>
      </form>
    </h2>
  </div>
</HeroComponent>
<Container class="mt-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">{t("admin", "articles")}</h1>
      <p class="mt-2 text-sm text-gray-700">{t("admin", "tableDescription")}</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
      <a class="btn variant-filled" href={linkToEditArticle()}>{t("admin", "newArticle")}</a>
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
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >{t("admin", "tableTitle")}</th
            >
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >{t("admin", "tableParent")}</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          {#each posts as post}
            <tr>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >{post.id}</td
              >
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.title}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.parent ?? "-"}</td
              >
              <td class="relative flex py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-1">
                <a class="btn btn-icon" href={`/artiklar/${post.slug}`}
                  ><EyeIcon class="h-4 w-4" /></a
                >
                <a class="btn btn-icon" href={linkToEditArticle({ post })}
                  ><PencilIcon class="h-4 w-4" /></a
                >
                <a class="btn btn-icon" href={linkToEditArticle({ parent: post })}
                  ><PlusSmIcon class="h-4 w-4" /></a
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Container>
