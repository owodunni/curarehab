<script lang="ts">
  import Container from "./Container.svelte";
  import { AcademicCapIcon, ChevronUpIcon, MenuIcon } from "@rgossiaux/svelte-heroicons/outline";
  import type { T, L } from "$lib/i18n/t";
  import type { Page } from "$lib/i18n";
  import { page } from "$app/stores";
  import { fade, fly } from "svelte/transition";

  export let t: T;
  export let l: L;

  let open = false;

  function toggle() {
    open = !open;
  }

  const baseLinks = ["behandlingar", "hitta", "terapeuter"] as const;

  const links = (locale: string | undefined) => {
    return locale === "en" ? baseLinks : (["skadekompassen", ...baseLinks] as const);
  };
  const buttonLinks = ["boka"] satisfies Page[];
</script>

<header>
  <nav>
    <Container class={"relative z-50 flex justify-between py-8"}>
      <div class="relative z-10 flex items-center gap-16">
        <a href={l("hem")} class="flex items-center"
          ><AcademicCapIcon class="text-primary-500 h-10 w-10" /><span
            class="text-base font-semibold">{t("common", "title")}</span
          ></a
        >
        <div class="hidden lg:flex lg:gap-10">
          {#each links($page.params.lang) as link}
            <a href={l(link)} class="text-tertiary-700 hover:text-tertiary-900 text-sm">
              {t("common", link)}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="lg:hidden">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={t("common", "menuAria")}
            aria-controls={open ? "popover-panel" : undefined}
            class="btn-icon relative z-10 -m-2"
            on:click={toggle}
          >
            {#if open}
              <ChevronUpIcon class="h-6 w-6" />
            {:else}
              <MenuIcon class="h-6 w-6" />
            {/if}
          </button>
          {#if open}
            <div
              aria-hidden="true"
              class="bg-surface-300/60 fixed inset-0 z-0 backdrop-blur-sm"
              in:fade={{ duration: 150 }}
              out:fade={{ duration: 200 }}
            />
            <div
              class="absolute inset-x-0 top-0 origin-top"
              in:fly={{ y: -64, duration: 150 }}
              out:fly={{ y: -64, duration: 200 }}
            >
              <div
                id="popover-panel"
                class="bg-surface-50 shadow-surface-900/20 z-0 w-screen rounded-b-2xl px-6 pb-6 pt-32 shadow-2xl"
              >
                <div class="flex flex-col items-start space-y-4">
                  {#each links($page.params.lang) as link}
                    <a
                      href={l(link)}
                      class="btn text-tertiary-700 hover:text-tertiary-900"
                      on:click={toggle}>{t("common", link)}</a
                    >
                  {/each}
                </div>
                {#if buttonLinks.length > 0}
                  <div class="mt-8 flex flex-col gap-4">
                    {#each buttonLinks as link}
                      <a class="btn variant-filled" href={l(link)} on:click={toggle}>
                        {t("common", link)}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
        {#each buttonLinks as link}
          <a class="btn variant-filled hidden lg:block" href={l(link)}>
            {t("common", link)}
          </a>
        {/each}
      </div>
    </Container>
  </nav>
</header>
