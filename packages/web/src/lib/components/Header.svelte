<script lang="ts">
  import Container from "./Container.svelte";
  import MenuIcon from "../components/Icons/Menu.svelte";
  import ChevronUpIcon from "../components/Icons/ChevronUp.svelte";
  import type { T, L } from "$lib/i18n/t";
  import { fade, fly } from "svelte/transition";
  import Logo from "./Logo.svelte";
  import Flags from "./Flags.svelte";
  import type { Page } from "$lib/i18n";

  const { t, l, locale, route }: { t: T; l: L; locale: "sv" | "en"; route: string } = $props();

  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }

  const links = $derived([
    "behandlingar",
    "hitta",
    "om",
    "kliniker",
    ...(locale === "sv" ? (["skadekompassen"] as const) : []),
  ] as const satisfies readonly Page[]);

  const localizedHref = $derived(
    (() => {
      if (route === `/${locale}` || route === "/") {
        return locale === "en" ? "/" : "/en";
      } else {
        return locale === "en" ? route.substring(3) : `/en${route.substring(3)}`;
      }
    })()
  );

  // We don't want to show the localization switch language when showing articles since they can't be localized
  const showLocalization = $derived(
    !(
      localizedHref.startsWith("/en/artiklar") ||
      localizedHref.startsWith("/sv/artiklar") ||
      route.startsWith("/sv/skadekompassen") ||
      route.startsWith("/en/skadekompassen")
    )
  );
</script>

<header lang={locale}>
  <nav>
    <Container class="relative z-50 flex justify-between py-8">
      <div class="relative z-10 flex items-center gap-16">
        <a
          class="btn-icon btn-lg border-x-secondary-200 absolute m-0 w-32 p-0"
          aria-label={t("common", "title")}
          href={l("hem")}
          onclick={close}
          ><Logo class="text-skog-700 hover:text-skog-900 w-48 transition-colors" /></a>
        <div class="hidden lg:flex lg:gap-12 lg:pl-48">
          {#each links as link (link)}
            <a class="btn variant-ghost text-base font-normal" href={l(link)}>
              {t("common", link)}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex gap-4 lg:hidden">
          {#if showLocalization}
            <a
              class="btn-icon relative z-10 h-8 w-8"
              data-sveltekit-reload
              href={localizedHref}
              onclick={close}>
              <Flags class="p-[2px]" flag={locale === "en" ? "swedish" : "english"} {t} />
            </a>
          {/if}
          <button
            class="btn-icon relative z-10 -m-2"
            aria-controls={open ? "popover-panel" : undefined}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={t("common", "menuAria")}
            onclick={toggle}
            type="button">
            {#if open}
              <ChevronUpIcon class="h-8 w-8" />
            {:else}
              <MenuIcon class="h-8 w-8" />
            {/if}
          </button>
          {#if open}
            <div
              class="bg-sand-300/60 fixed inset-0 z-0 backdrop-blur-sm"
              aria-hidden="true"
              onclick={close}
              in:fade|global={{ duration: 150 }}
              out:fade|global={{ duration: 200 }}>
            </div>
            <div
              class="absolute inset-x-0 top-0 origin-top"
              in:fly|global={{ y: -64, duration: 150 }}
              out:fly|global={{ y: -64, duration: 200 }}>
              <div
                id="popover-panel"
                class="bg-sand-100 z-0 w-screen rounded-b-2xl px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20">
                <div class="flex flex-col items-start space-y-4">
                  {#each links as link (link)}
                    <a class="btn text-gray-700 hover:text-gray-900" href={l(link)} onclick={toggle}
                      >{t("common", link)}</a>
                  {/each}
                </div>
                <div class="mt-8 flex flex-col gap-4">
                  <a class="btn variant-filled" href={t("common", "hanoLink")} onclick={toggle}>
                    {t("common", "boka")}
                  </a>
                </div>
              </div>
            </div>
          {/if}
        </div>
        {#if showLocalization}
          <a class="btn-icon m-0 hidden p-0 lg:block" data-sveltekit-reload href={localizedHref}>
            <Flags class=" h-10 w-10 p-1" flag={locale === "en" ? "swedish" : "english"} {t} />
          </a>
        {/if}
        <a class="btn variant-filled hidden lg:block" href={t("common", "hanoLink")}>
          {t("common", "boka")}
        </a>
      </div>
    </Container>
  </nav>
</header>
