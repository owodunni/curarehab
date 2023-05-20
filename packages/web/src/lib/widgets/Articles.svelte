<script lang="ts">
  import type { L } from "$lib/i18n/t";
  import type { BlogPostMetaData } from "@curarehab/api";

  export let l: L;
  export let posts: BlogPostMetaData[] = [];
  const toDate = (post: BlogPostMetaData) => new Date(post.updated_at).toLocaleDateString("sv-se");
</script>

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        Learn how to grow your business with our expert advice.
      </p>
    </div>
    <div
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {#each posts as post}
        <article class="flex flex-col items-start">
          <div class="relative w-full">
            <img
              src={post.cover_photo}
              alt=""
              class="bg-tertiary-100 aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div class="ring-tertiary-900/10 absolute inset-0 rounded-2xl ring-1 ring-inset" />
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" class="text-tertiary-500">{toDate(post)}</time>
            </div>
            <div class="group relative">
              <h3
                class="text-tertiary-900 group-hover:text-tertiary-600 mt-3 text-lg font-semibold leading-6"
              >
                <a href="/">
                  <span class="absolute inset-0" />
                  {post.title}
                </a>
              </h3>

              <article class="prose mt-5">
                <!-- eslint-disable svelte/no-at-html-tags -->
                {@html post.excerpt}
              </article>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img
                src={post.terapheut.profile_photo}
                alt=""
                class="bg-tertiary-100 h-10 w-10 rounded-full"
              />
              <div class="text-sm leading-6">
                <p class="text-tertiary-900 font-semibold">
                  <a href={`${l("terapeuter")}/${post.terapheut.user_id}`}>
                    <span class="absolute inset-0" />
                    {post.terapheut.first_name}
                    {post.terapheut.last_name}
                  </a>
                </p>
                <p class="text-tertiary-600">{post.terapheut.title}</p>
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
