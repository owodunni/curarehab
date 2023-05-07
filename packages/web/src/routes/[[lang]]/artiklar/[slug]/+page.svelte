<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button, Container } from "$lib/components";
  import { PencilIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { EyeIcon, SaveIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { marked } from "marked";
  import type { PageData } from "./$types";
  export let data: PageData;
  export let showMarkdown = false;

  $: editedHtml = marked.parse(data.post.post);
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.excerpt} />
</svelte:head>

<Container class="pb-16">
  {#if data.session?.user}
    <div class="flex w-full justify-end gap-1 pb-1">
      <Button variant="outline" on:click={() => (showMarkdown = !showMarkdown)}
        >{#if showMarkdown}<EyeIcon class="h-5 w-5" />
        {:else}
          <PencilIcon class="h-5 w-5" />
        {/if}</Button
      >
      <Button variant="outline" type="submit" form="post_form">
        <SaveIcon class="h-5 w-5" /></Button
      >
    </div>
    {#if !showMarkdown}
      <article class="prose">
        {@html editedHtml}
      </article>
    {:else}
      <form id="post_form" method="POST" use:enhance>
        <textarea
          name="post"
          id="post"
          class="h-96 w-full"
          bind:value={data.post.post}
          placeholder="Markdown"
        />
        <input name="post_id" id="post_id" value={data.post.id} class="hidden" />
      </form>
    {/if}
  {:else}
    <article class="prose">
      {@html data.post.html}
    </article>
  {/if}
</Container>
