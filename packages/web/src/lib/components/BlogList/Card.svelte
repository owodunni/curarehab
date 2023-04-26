<script lang="ts">
  import type { BlogPostMetaData } from "@curarehab/api";

  export let post: BlogPostMetaData;
</script>

<li
  class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
>
  <div class="flex flex-1 flex-col p-8">
    <h3 class="mt-6 text-sm font-medium text-gray-900">{post.title}</h3>
    <dl class="mt-1 flex flex-grow flex-col justify-between">
      <dt class="sr-only">{post.title}</dt>
      <dd class="text-sm text-gray-500">{post.excerpt}</dd>
    </dl>
  </div>
</li>
