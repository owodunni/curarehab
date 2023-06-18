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
        ["terapeuter"],
        ["artiklar"]
      ],
      [t("common", "information")]: [["om"], ["hitta"], ["personuppgiftspolicy"], ["cookies"]]
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
  class="bg-error-50 border-t border-gray-200 pb-8 pt-16 sm:pt-24"
  aria-labelledby="footer-heading"
>
  <Container>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="flex flex-col items-center space-y-8">
        <a href={l("hem")} class="btn-icon w-32"><Logo class="text-teak-700 w-32" /> </a>
        <div class="flex space-x-6">
          {#each socialLinks as link}
            <SocialLink {link} class="text-gray-400 hover:text-gray-500" />
          {/each}
        </div>
      </div>
      <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <div>
          <h3 class="text-sm font-semibold leading-6 text-gray-900">{t("common", "hitta")}</h3>
          <ul class="mt-6 space-y-4">
            <li>
              {#if location}
                <SocialLink
                  link={location}
                  class="flex gap-x-4 text-sm leading-6 text-gray-600 hover:text-gray-900 xl:-ml-10"
                  onlyIcon={false}
                />
              {/if}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold leading-6 text-gray-900">
            {t("common", "contact")}
          </h3>
          <ul class="mt-6 space-y-4">
            <li>
              {#if email}
                <SocialLink
                  link={email}
                  class="flex gap-x-4 text-sm leading-6 text-gray-600 hover:text-gray-900 xl:-ml-10"
                  onlyIcon={false}
                />
              {/if}
            </li>
            <li>
              {#if phone}
                <SocialLink
                  link={phone}
                  class="flex gap-x-4 text-sm leading-6 text-gray-600 hover:text-gray-900 xl:-ml-10"
                  onlyIcon={false}
                />
              {/if}
            </li>
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
                <h3 class="text-sm font-semibold leading-6 text-gray-900">{title}</h3>
                <ul class="mt-6 space-y-4">
                  {#each toLinks(links) as [href, linkTitle]}
                    <li>
                      <a {href} class="text-sm text-gray-600 hover:text-gray-900">{linkTitle}</a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        {/each}
      </div>
    </div>
    <div class="mt-16 flex space-x-1 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
      <p class="text-xs leading-5 text-gray-500">
        &copy; {new Date().getFullYear()}
        {t("common", "title")} Linköping AB
      </p>
    </div>
  </Container>
</footer>
