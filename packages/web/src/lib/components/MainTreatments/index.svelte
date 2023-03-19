<script lang="ts">
  import { Container } from "$lib/components";
  import treatmentImg from "$lib/assets/rehab-treatment-unsplash.jpg";
  import { Tab, TabGroup, TabList } from "@rgossiaux/svelte-headlessui";
  import { t } from "$lib/i18n";
  import type { HemTranslations } from "$lib/i18n/types";

  const treatments: { title: keyof HemTranslations; description: keyof HemTranslations }[] = [
    {
      title: "naprapathyTitle",
      description: "naprapathyParagraph"
    },
    {
      title: "physiotherapyTitle",
      description: "physiotherapyParagraph"
    },
    {
      title: "massageTitle",
      description: "massageParagraph"
    }
  ];
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
  </Container>

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
          </div>
        </div>
      {/each}
    </TabList>
    <div class="relative col-span-6">
      <img
        src={treatmentImg}
        alt=""
        class="col-start-1 row-start-1 flex rounded-lg grayscale focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
      />
    </div>
  </TabGroup>
  <!--div class="mt-16">
    <img src={treatment} alt="" />
  </div-->
  <!--Container class="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container-->
</section>
