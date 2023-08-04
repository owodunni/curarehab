<script lang="ts">
  import Container from "./Container.svelte";
  import type { T, L } from "$lib/i18n/t";
  import type { Page } from "$lib/i18n";
  import Logo from "./Logo.svelte";
  import type { Link } from "$lib/api";
  import SocialLink from "./SocialLink.svelte";

  export let t: T;
  export let l: L;
  export let socialLinks: Link[] = [];
  export let columnLinks: [Link[], Link[]] = [[], []];
  export let email: Link | undefined;
  export let location: Link | undefined;
  export let phone: Link | undefined;
  export let locale: "sv" | "en";

  /**
   * This structure is a bit complex, but it allows us to seperate out links from the html structure.
   * Its a list of two lists of links with titles, the first list is in the left column and the second in the right.
   * If we are on a small screen, the two lists are shown on top of each other.
   */
  let linksWithCategory: Record<string, ([Page] | Link)[]>[] = [];
  $: linksWithCategory = [
    {
      [t("common", "ourServices")]: [
        {
          link: t("common", "hanoLink"),
          display_link: t("common", "boka"),
          type: "website"
        },
        ["behandlingar"],
        ["terapeuter"]
        // TODO(#85): Add artiklar to footer
        //["artiklar"]
      ],
      // TODO(#85): Add cookies and personuppgiftspolicy to footer
      [t("common", "information")]: [["om"], ["hitta"] /*["personuppgiftspolicy"], ["cookies"]*/]
    },
    {
      [t("common", "partners")]: columnLinks[0],
      [t("common", "readMore")]: [
        {
          link: t("common", "fysioHref"),
          display_link: t("common", "fysioLinkTitle"),
          type: "website"
        },
        {
          link: t("common", "naprapatHref"),
          display_link: t("common", "naprapatLinkTitle"),
          type: "website"
        },
        ...columnLinks[1]
      ]
    }
  ];

  function toLinks(links: ([Page] | Link)[]): [string, string][] {
    return links.map((link) => {
      if (Array.isArray(link)) {
        return [l(link[0]), t("common", link[0])];
      }
      return [link.link, link.display_link];
    });
  }
</script>

<footer
  class="theme-skog-dark bg-section pb-8 pt-16 sm:pt-24"
  aria-labelledby="footer-heading"
  lang={locale}
>
  <Container>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="flex flex-col items-center space-y-8">
        <a href={l("hem")} class="btn-icon w-32" aria-label={t("common", "title")}
          ><Logo class="text-theme-body hover:text-theme-muted-hover w-32 transition-colors" />
        </a>
        <div class="flex space-x-6">
          {#each socialLinks as link}
            <SocialLink {link} class="text-theme-body hover:text-theme-muted-hover" />
          {/each}
        </div>
      </div>
      <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <div>
          <h3 class="text-theme-heading text-sm font-semibold leading-6">{t("common", "hitta")}</h3>
          <ul class="mt-6 w-full space-y-4">
            <li>
              {#if location}
                <SocialLink
                  link={location}
                  class="text-theme-muted hover:text-theme-muted-hover flex gap-x-4 text-sm leading-6 xl:-ml-10"
                  onlyIcon={false}
                />
              {/if}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-theme-heading text-sm font-semibold leading-6">
            {t("common", "contact")}
          </h3>
          <ul class="mt-6 space-y-4">
            {#each [email, phone] as link}
              <li>
                {#if link}
                  <SocialLink
                    {link}
                    class="text-theme-muted hover:text-theme-muted-hover flex gap-x-4 text-sm leading-6 xl:-ml-10"
                    onlyIcon={false}
                  />
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div />
      <div class="col-start-2 mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        {#each linksWithCategory as outerLinks}
          <div class={"md:grid md:grid-cols-2 md:gap-8"}>
            {#each Object.entries(outerLinks) as [title, links], i}
              <div class={i % 2 === 0 ? "" : "mt-10 md:mt-0"}>
                <h3 class="text-theme-body text-sm font-semibold leading-6">{title}</h3>
                <ul class="mt-6 space-y-4">
                  {#each toLinks(links) as [href, linkTitle]}
                    <li>
                      <a {href} class="text-theme-muted hover:text-theme-muted-hover text-sm"
                        >{linkTitle}</a
                      >
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="border-theme-div mt-16 flex space-x-1 border-t pt-8 sm:mt-20 lg:mt-24">
      <p class="text-theme-muted text-xs leading-5">
        &copy; {new Date().getFullYear()}
        {t("common", "title")} Linköping AB
      </p>
    </div>
  </Container>
</footer>
