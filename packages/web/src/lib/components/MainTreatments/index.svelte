<script lang="ts">
  import { Container } from "$lib/components";
  import physioImg from "$lib/assets/rehab-physio-unsplash.webp";
  import napraImg from "$lib/assets/rehab-napra-unsplash.webp";
  import massageImg from "$lib/assets/massage-unsplash.webp";
  import { Tab, TabGroup, TabList } from "@rgossiaux/svelte-headlessui";
  import { t, l } from "$lib/i18n";
  import { fade } from "svelte/transition";

  const treatments = [
    {
      title: "naprapathyTitle",
      description: "naprapathyParagraph",
      image: napraImg
    },
    {
      title: "physiotherapyTitle",
      description: "physiotherapyParagraph",
      image: physioImg
    },
    {
      title: "massageTitle",
      description: "massageParagraph",
      image: massageImg
    }
  ] as const;
</script>

<section
  id="features"
  aria-label="Features for investing all your money"
  class="bg-gray-900 py-20 sm:py-32"
>
  <Container>
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
      <h2 class="text-3xl font-medium tracking-tight text-white">
        {$t("hem", "mainTreatmentTitle")}
      </h2>
      <p class="mt-2 text-lg text-gray-400">
        {$t("hem", "mainTreatmentParagraph")}
      </p>
    </div>

    <div class="md:mt-20 md:block">
      <TabGroup
        as="div"
        class="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
        vertical
        let:selectedIndex
      >
        <TabList class="relative z-10 col-span-12 space-y-6 md:order-last md:col-span-6">
          {#each treatments as treatment, i}
            <div class="relative rounded-2xl transition-colors hover:bg-gray-800/30">
              {#if i === selectedIndex}
                <div class="absolute inset-0 rounded-lg bg-gray-800" />
              {/if}
              <div class="relative z-10 p-8">
                <h3 class="text-lg font-semibold text-white">
                  <Tab>
                    <div class="text-left [&:not(:focus-visible)]:focus:outline-none">
                      <span class="absolute inset-0 rounded-2xl" />
                      {$t("hem", treatment.title)}
                    </div>
                  </Tab>
                </h3>
                <p class="mt-2 text-sm text-gray-400">
                  {$t("hem", treatment.description)}
                </p>
                <div class="pt-4">
                  <a
                    href={$l("blog")}
                    class="relative text-sm font-semibold text-white hover:text-gray-300"
                    >{$t("hem", "readMore")} <span aria-hidden="true">→</span></a
                  >
                </div>
              </div>
            </div>
            <img src={treatment.image} alt="" class="rounded-lg object-cover grayscale md:hidden" />
          {/each}
        </TabList>
        <div class="relative col-span-12 h-full w-full md:col-span-6">
          {#each treatments as { image }, i}
            {#if i === selectedIndex}
              <img
                transition:fade
                src={image}
                alt=""
                class="absolute h-full w-full rounded-lg object-cover grayscale"
              />
            {/if}
          {/each}
        </div>
      </TabGroup>
    </div>
    <!--div class="mt-16">
    <img src={treatment} alt="" />
  </div-->
    <!--Container class="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container-->
  </Container>
</section>
