<script lang="ts">
  import type { Block } from "./types";
  import Image from "../Image.svelte";

  export let block: Block;
</script>

{#if block.type === "header"}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<h${block.data.level}>${block.data.text}</h${block.data.level}>`}
{:else if block.type === "paragraph"}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<p>${block.data.text}</p>`}
{:else if block.type === "nestedlist"}
  <ul>
    {#each block.data.items as { content }}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <li>{@html content}</li>
    {/each}
  </ul>
{:else if block.type === "image"}
  <Image
    srcPath={`${block.data.file.url}.${block.data.file.extension}`}
    loading="lazy"
    width={block.data.file.width}
    height={block.data.file.height}
    alt={block.data.caption}
    class="rounded-2xl"
  />
{:else if block.type === "quote"}
  <blockquote>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p>{@html block.data.text}</p>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <cite>{@html block.data.caption} </cite>
  </blockquote>
{:else if block.type === "code"}
  <pre>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <code>{@html block.data.code}</code>
  </pre>
{:else if block.type === "delimiter"}
  <hr />
{:else if block.type === "table"}
  <table>
    <thead>
      <tr>
        {#each block.data.content[0] as header}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <th>{@html header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each block.data.content.slice(1) as row}
        <tr>
          {#each row as cell}
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            <td>{@html cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
