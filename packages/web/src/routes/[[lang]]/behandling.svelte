<script>
  import ArrowPath from "$lib/components/Icons/ArrowPath.svelte";
  import Hearth from "$lib/components/Icons/Hearth.svelte";
  import Home from "$lib/components/Icons/Home.svelte";
  import Search from "$lib/components/Icons/Search.svelte";
</script>

<div class="mx-auto max-w-2xl lg:text-center">
  <h2 class="text-theme-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
    Hur går en behandling till?
  </h2>
  <p class="text-theme-body mt-6 text-lg">
    Låt oss guida dig genom varje steg av din behandling så att du känner dig trygg inför ditt
    besök.
  </p>
</div>
<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
  <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <Search class="text-tegel h-5 w-5 flex-none" stroke-width="1.7" />
        Undersökning
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          Vid ditt första besök lyssnar vi noga på dina besvär och genomför en noggrann
          undersökning. Tillsammans skapar vi en personligt anpassad behandlingsplan som passar in i
          din livsstil.
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-body flex items-center gap-x-3 text-base font-semibold leading-7">
        <Hearth class="text-tegel h-5 w-5 flex-none" />
        Behandling
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          Baserat på din undersökning utför vi en behandling för att lindra smärta och återfå
          rörelseförmåga. Vi använder olika behandlingsmetoder, så som massage, akupunktur,
          stötvågsbehandling, manuella justeringar med mera.
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <Home class="text-tegel h-5 w-5 flex-none" />
        Egenvård & hemövningar
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          Vi hjälper dig att hitta rätt övningar och ger dig ett personligt träningsprogram som
          passar in i din vardag och livsstil för bästa resultat.
        </p>
      </dd>
    </div>
    <div class="flex flex-col">
      <dt class="text-theme-heading flex items-center gap-x-3 text-base font-semibold leading-7">
        <ArrowPath class="text-tegel h-5 w-5 flex-none" />
        Uppföljning
      </dt>
      <dd class="text-theme-body mt-4 flex flex-auto flex-col text-base leading-7">
        <p class="flex-auto">
          Regelbunden uppföljning är viktig för att säkerställa att du får den vård du behöver.
          Tillsammans håller vi dig på rätt väg för att undvika att besvären kommer tillbaka. Vi
          finns här för dig hela vägen.
        </p>
      </dd>
    </div>
  </dl>
</div>
