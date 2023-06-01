<script lang="ts">
  import type { Block } from "./types";

  export let block: Block;
</script>

{#if block.type === "header"}
  {#if block.data.level === 1}
    <h1>{block.data.text}</h1>
  {:else if block.data.level === 2}
    <h2>{block.data.text}</h2>
  {:else if block.data.level === 3}
    <h3>{block.data.text}</h3>
  {:else if block.data.level === 4}
    <h4>{block.data.text}</h4>
  {:else if block.data.level === 5}
    <h5>{block.data.text}</h5>
  {:else if block.data.level === 6}
    <h6>{block.data.text}</h6>
  {/if}
{:else if block.type === "paragraph"}
  <p>{block.data.text}</p>
{:else if block.type === "nestedlist"}
  <ul>
    {#each block.data.items as { content }}
      <li>{content}</li>
    {/each}
  </ul>
{:else if block.type === "image"}
  <img
    src={`https://jardoole.xyz${block.data.file.url}`}
    width={block.data.file.width}
    height={block.data.file.height}
    alt={block.data.caption}
  />
{:else if block.type === "quote"}
  <blockquote>
    <p>{block.data.text}</p>
    <cite> {block.data.caption} </cite>
  </blockquote>
{:else if block.type === "code"}
  <pre>
    <code>{block.data.code}</code>
  </pre>
{:else if block.type === "delimiter"}
  <hr />
{:else if block.type === "table"}
  <table>
    <thead>
      <tr>
        {#each block.data.content[0] as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each block.data.content.slice(1) as row}
        <tr>
          {#each row as cell}
            <td>{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
