<script lang="ts">
  import { Button, Container } from "$lib/components";
  import { PencilIcon } from "@rgossiaux/svelte-heroicons/outline";
  import { EyeIcon, SaveIcon } from "@rgossiaux/svelte-heroicons/solid";
  import { marked } from "marked";
  import type { PageData } from "./$types";
  export let data: PageData;
  export let showMarkdown = false;

  $: editedHtml = marked.parse(data.post.post);
  async function save() {
    const res = await data.supabase.s
      .from("blog")
      .update({
        post: data.post.post,
        updated_at: new Date().toISOString()
      })
      .eq("id", data.post.id);
    if (res.error) {
      console.error(res.error);
    } else {
      window.location.reload();
    }
  }
</script>

<Container class="pb-16">
  {#if data.session?.user}
    <div class="flex w-full justify-end gap-1 pb-1">
      <Button variant="outline" on:click={() => (showMarkdown = !showMarkdown)}
        >{#if showMarkdown}<EyeIcon class="h-5 w-5" />
        {:else}
          <PencilIcon class="h-5 w-5" />
        {/if}</Button
      >
      <Button variant="outline" on:click={save}>
        <SaveIcon class="h-5 w-5" /></Button
      >
    </div>
    {#if !showMarkdown}
      <article class="prose">
        {@html editedHtml}
      </article>
    {:else}
      <textarea class="h-96 w-full" bind:value={data.post.post} placeholder="Markdown" />
    {/if}
  {:else}
    <article class="prose">
      {@html data.post.html}
    </article>
  {/if}
</Container>
