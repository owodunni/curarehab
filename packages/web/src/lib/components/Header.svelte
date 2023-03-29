<script lang="ts">
  import { l, t } from "$lib/i18n";
  import Container from "./Container.svelte";
  import Button from "./Button.svelte";
  import { AcademicCapIcon, MenuIcon, ChevronUpIcon } from "@rgossiaux/svelte-heroicons/outline";
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
    PopoverOverlay,
    Transition
  } from "@rgossiaux/svelte-headlessui";
  import NavLink from "./NavLink.svelte";
  const links = ["om", "blog"] as const;
  const buttonLinks = ["boka"] as const;
</script>

<header>
  <nav>
    <Container class={"relative z-50 flex justify-between py-8"}>
      <div class="relative z-10 flex items-center gap-16">
        <a href={$l("hem")} class="flex items-center"
          ><AcademicCapIcon class="h-10 w-10 text-zinc-500" /><span class="text-base font-semibold"
            >{$t("common", "title")}</span
          ></a
        >
        <div class="hidden lg:flex lg:gap-10">
          <NavLink />
        </div>
      </div>
      <div class="flex items-center gap-6">
        <Popover class="lg:hidden" aria-label={$t("common", "menuAria")} let:open let:close>
          <PopoverButton
            class="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none"
          >
            {#if open}
              <ChevronUpIcon class="h-6 w-6" />
            {:else}
              <MenuIcon class="h-6 w-6" />
            {/if}
          </PopoverButton>
          <Transition
            enter="transition-opacity duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <PopoverOverlay class="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur" />
          </Transition>
          <Transition
            as="div"
            class="absolute inset-x-0 top-0 origin-top"
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 -translate-y-8"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-8"
          >
            <PopoverPanel
              class="z-0 w-screen rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
            >
              <div class="space-y-4">
                {#each links as link}
                  <PopoverButton
                    class="block text-base leading-7 tracking-tight text-gray-700"
                    as="a"
                    href={$l(link)}
                  >
                    {$t("common", link)}
                  </PopoverButton>
                {/each}
              </div>

              <div class="mt-8 flex flex-col gap-4">
                {#each buttonLinks as link, i}
                  <Button
                    href={$l(link)}
                    variant="solid"
                    on:click={() => close(null)}
                  >
                    {$t("common", link)}
                  </Button>
                {/each}
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
        {#each buttonLinks as link, i}
          <Button class="hidden lg:block" href={$l(link)} variant="solid">
            {$t("common", link)}
          </Button>
        {/each}
      </div>
    </Container>
  </nav>
</header>
