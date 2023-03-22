<script lang="ts">
  import { Container } from "$lib/components";
  import physioImg from "$lib/assets/rehab-physio-unsplash.jpg";
  import napraImg from "$lib/assets/rehab-napra-unsplash.jpg";
  import massageImg from "$lib/assets/massage-unsplash.jpg";
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
        <TabList class="relative z-10 order-last col-span-6 space-y-6">
          {#each treatments as treatment, i}
            <div class="relative rounded-2xl transition-colors hover:bg-gray-800/30">
              {#if i === selectedIndex}
                <div class="absolute inset-0 rounded-lg bg-gray-800" />
              {/if}
              <div class="relative z-10 p-8">
                <h3 class="mt-6 text-lg font-semibold text-white">
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
                {#if i === selectedIndex}
                  <div class="pt-4">
                    <a
                      href={$l("blogg")}
                      class="relative text-sm font-semibold text-white hover:text-gray-300"
                      >{$t("hem", "readMore")} <span aria-hidden="true">→</span></a
                    >
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </TabList>
        <div class="relative col-span-6">
          <div class="relative aspect-video">
            {#each treatments as { image }, i}
              {#if i === selectedIndex}
                <img transition:fade src={image} alt="" class="absolute rounded-lg grayscale" />
              {/if}
            {/each}
          </div>
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
