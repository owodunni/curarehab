<script lang="ts">
  import type { BlogPostMetaData } from "@curarehab/api";
  import type { L } from "$lib/i18n/t";
  import { Avatar } from "@skeletonlabs/skeleton";

  export let posts: BlogPostMetaData[];

  export let l: L;

  const toDate = (post: BlogPostMetaData) => new Date(post.updated_at).toLocaleDateString("sv-se");
</script>

<div class="text-token grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#each posts as post}
    <a class="card card-hover overflow-hidden" href={`${l("artiklar")}/${post.slug}`}>
      <header>
        <img
          src="https://source.unsplash.com/vjUokUWbFOs/400x175"
          class="aspect-[21/9] w-full bg-black/50"
          alt="Post"
        />
      </header>
      <div class="space-y-4 p-4">
        <h3 class="h3" data-toc-ignore>{post.title}</h3>
        <article>
          <p>
            {post.excerpt}
          </p>
        </article>
      </div>
      <hr class="opacity-50" />
      <footer class="flex items-center justify-start space-x-4 p-4">
        <Avatar src="https://source.unsplash.com/YOErFW8AfkI/32x32" width="w-8" />
        <div class="flex flex-auto items-center justify-between">
          <h6 class="font-bold">{post.author}</h6>
          <small>
            <time datetime="2022-09-05">{toDate(post)}</time>
          </small>
        </div>
      </footer>
    </a>
  {/each}
</div>
