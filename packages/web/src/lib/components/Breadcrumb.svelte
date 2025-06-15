<script lang="ts">
  import type { L } from "$lib/i18n/t";

  interface BreadcrumbItem {
    title: string;
    href?: string;
    current?: boolean;
  }

  interface Props {
    items: BreadcrumbItem[];
    l: L;
  }

  const { items, l }: Props = $props();
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="flex items-center space-x-4" role="list">
    <!-- Kliniker root -->
    <li>
      <div>
        <a class="text-skog-600 hover:text-skog-700 text-sm font-medium" href={l("kliniker")}>
          Kliniker
        </a>
      </div>
    </li>

    <!-- Dynamic breadcrumb items -->
    {#each items as item (item.title)}
      <li>
        <div class="flex items-center">
          <svg
            class="text-skog-400 size-5 shrink-0"
            aria-hidden="true"
            data-slot="icon"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              clip-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fill-rule="evenodd" />
          </svg>
          {#if item.href && !item.current}
            <a class="text-skog-600 hover:text-skog-700 ml-4 text-sm font-medium" href={item.href}>
              {item.title}
            </a>
          {:else}
            <span
              class="text-skog-700 ml-4 text-sm font-medium"
              aria-current={item.current ? "page" : undefined}>
              {item.title}
            </span>
          {/if}
        </div>
      </li>
    {/each}
  </ol>
</nav>
