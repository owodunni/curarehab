<script lang="ts">
  import { Container } from ".";
  import treatmentImg from "$lib/assets/rehab-treatment-unsplash.jpg";
  import { Tab, TabGroup, TabList } from "@rgossiaux/svelte-headlessui";

  const treatments: { title: string; description: string }[] = [
    {
      title: "Naprapati - Smärtlindring för muskler och leder",
      description:
        "Våra naprapater använder manuella tekniker och träning för att lindra smärta och öka rörligheten i muskler och leder."
    },
    {
      title: "Fysioterapi - Återställer rörlighet och förbättrar funktion",
      description:
        "Våra fysioterapeuter använder manuell terapi och andra tekniker för att återställa rörligheten och förbättra funktionen i kroppen."
    },
    {
      title: "Massage - Avkoppling och återhämtning för kropp och själ",
      description:
        "Våra massageterapeuter använder olika tekniker för att lindra muskelspänningar, öka blodcirkulationen och förbättra rörligheten, samtidigt som du kan koppla av och återhämta dig."
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
        Våra behandlingar - Skräddarsydda för din hälsa och återhämtning
      </h2>
      <p class="mt-2 text-lg text-gray-400">
        På CuraRehab erbjuder vi en rad olika behandlingar. Våra kvalificerade terapeuter arbetar
        tillsammans för att utveckla en skräddarsydd behandlingsplan som passar dina specifika behov
        och mål för att hjälpa dig att återhämta dig och återfå din hälsa.
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
                  {treatment.title}
                </div>
              </Tab>
            </h3>
            <p class="mt-2 text-sm text-gray-400">
              {treatment.description}
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
