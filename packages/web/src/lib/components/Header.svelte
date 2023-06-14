<script lang="ts">
  import Container from "./Container.svelte";
  import { ChevronUpIcon, MenuIcon } from "@rgossiaux/svelte-heroicons/outline";
  import type { T, L } from "$lib/i18n/t";
  import type { Page } from "$lib/i18n";
  import { fade, fly } from "svelte/transition";
  import Logo from "./Logo.svelte";
  import Flags from "./Flags.svelte";

  export let t: T;
  export let l: L;
  export let locale: "sv" | "en";
  export let route: string;

  let open = false;

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  const links = ["behandlingar", "hitta", "terapeuter", "artiklar"] as const;

  const buttonLinks = ["boka"] satisfies Page[];

  $: localizedHref = ((): string => {
    if (route === `/${locale}` || route === "/") return locale === "en" ? "/" : "/en";
    else return locale === "en" ? route.substring(3) : `/en${route.substring(3)}`;
  })();
  // We don't want to show the localization switch language when showing articles since they can't be localized
  $: showLocalization = !(
    localizedHref.startsWith("/en/artiklar/") || localizedHref.startsWith("/artiklar/")
  );
</script>

<header>
  <nav>
    <Container class={"relative z-50 flex justify-between py-8"}>
      <div class="relative z-10 flex items-center gap-16">
        <a href={l("hem")} class="btn-icon text-surface-700 m-0 h-10 w-20 p-0" on:click={close}
          ><Logo /></a
        >
        <div class="hidden lg:flex lg:gap-10">
          {#each links as link}
            <a href={l(link)} class="text-tertiary-700 hover:text-tertiary-900 text-sm">
              {t("common", link)}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex gap-4 lg:hidden">
          {#if showLocalization}
            <a
              class="btn-icon ring-surface-500 relative z-10 h-8 w-8 ring ring-[2px]"
              href={localizedHref}
              on:click={close}
            >
              <Flags {t} flag={locale === "en" ? "swedish" : "english"} class="p-[2px]" />
            </a>
          {/if}
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
              <ChevronUpIcon class="h-8 w-8" />
            {:else}
              <MenuIcon class="h-8 w-8" />
            {/if}
          </button>
          {#if open}
            <div
              aria-hidden="true"
              class="bg-surface-300/60 fixed inset-0 z-0 backdrop-blur-sm"
              in:fade={{ duration: 150 }}
              out:fade={{ duration: 200 }}
              on:click={close}
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
                  {#each links as link}
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
        {#if showLocalization}
          <a class="btn-icon m-0 hidden p-0 lg:block" href={localizedHref}>
            <Flags
              {t}
              flag={locale === "en" ? "swedish" : "english"}
              class="ring-surface-500 h-10 w-10 p-1  ring ring-[2px]"
            />
          </a>
        {/if}
        {#each buttonLinks as link}
          <a class="btn variant-filled hidden lg:block" href={l(link)}>
            {t("common", link)}
          </a>
        {/each}
      </div>
    </Container>
  </nav>
</header>
