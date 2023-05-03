<script>
  import { t } from "$lib/i18n";
  import NavLink from "./NavLink.svelte";
  import Link from "./Link.svelte";
  import Container from "./Container.svelte";
  import { AcademicCapIcon } from "@rgossiaux/svelte-heroicons/outline";
</script>

<footer class="border-t border-gray-200" aria-labelledby="footer-heading">
  <Container>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div
      class="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16"
    >
      <div>
        <div class="flex items-center text-gray-900">
          <AcademicCapIcon class="h-10 w-10 flex-none text-zinc-500" />
          <div class="ml-4">
            <p class="text-base font-semibold">{$t("common", "title")}</p>
            <p class="mt-1 text-sm">{$t("common", "subtitle")}</p>
          </div>
        </div>
        <nav class="mt-11 flex gap-8">
          <NavLink extraLinks={["admin"]} />
        </nav>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between border-t border-gray-900/10 pb-12 pt-8">
      <p class="text-sm leading-5">
        &copy; {new Date().getFullYear()}
        {$t("common", "title")}
      </p>
      <Link href="mailto: info@curarehab.se">info@curarehab.se</Link>
    </div>
  </Container>
</footer>
