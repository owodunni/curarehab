<script lang="ts">
  import Container from "./Container.svelte";
  import { ChevronUpIcon, MenuIcon } from "@rgossiaux/svelte-heroicons/outline";
  import type { T, L } from "$lib/i18n/t";
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

  // TODO(#85): Add articles to the links array
  const links = ["behandlingar", "hitta", "om" /* artiklar*/] as const;

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
    <Container class={"relative z-50 flex justify-between py-8 "}>
      <div class="relative z-10 flex items-center gap-16">
        <a
          href={l("hem")}
          class="btn-icon btn-lg border-x-secondary-200 absolute m-0 w-32 p-0"
          on:click={close}
          aria-label={t("common", "title")}
          ><Logo class="text-skog-700 hover:text-skog-900 w-48 transition-colors" /></a
        >
        <div class="hidden lg:flex lg:gap-12 lg:pl-48">
          {#each links as link}
            <a href={l(link)} class="btn variant-ghost text-base font-normal">
              {t("common", link)}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex gap-4 lg:hidden">
          {#if showLocalization}
            <a class="btn-icon relative z-10 h-8 w-8" href={localizedHref} on:click={close}>
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
              class="bg-sand-300/60 fixed inset-0 z-0 backdrop-blur-sm"
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
                class="bg-sand-100 z-0 w-screen rounded-b-2xl px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
              >
                <div class="flex flex-col items-start space-y-4">
                  {#each links as link}
                    <a
                      href={l(link)}
                      class="btn text-gray-700 hover:text-gray-900"
                      on:click={toggle}>{t("common", link)}</a
                    >
                  {/each}
                </div>
                <div class="mt-8 flex flex-col gap-4">
                  <a class="btn variant-filled" href={t("common", "hanoLink")} on:click={toggle}>
                    {t("common", "boka")}
                  </a>
                </div>
              </div>
            </div>
          {/if}
        </div>
        {#if showLocalization}
          <a class="btn-icon m-0 hidden p-0 lg:block" href={localizedHref}>
            <Flags {t} flag={locale === "en" ? "swedish" : "english"} class=" h-10 w-10 p-1" />
          </a>
        {/if}
        <a class="btn variant-filled hidden lg:block" href={t("common", "hanoLink")}>
          {t("common", "boka")}
        </a>
      </div>
    </Container>
  </nav>
</header>
