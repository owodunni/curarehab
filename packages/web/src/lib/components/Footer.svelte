<script lang="ts">
  import Container from "./Container.svelte";
  import type { T, L } from "$lib/i18n/t";
  import type { Page } from "$lib/i18n";
  import Logo from "./Logo.svelte";
  import type { Link } from "./Icons/types";
  import SocialLink from "./SocialLink.svelte";

  export let t: T;
  export let l: L;
  export let socialLinks: Link[] = [
    { type: "facebook", link: "/", display_link: "" },
    { type: "instagram", link: "/", display_link: "" },
    { type: "linkedin", link: "/", display_link: "" },
    { type: "github", link: "/", display_link: "" },
    { type: "email", link: "/", display_link: "" },
    { type: "phone", link: "/", display_link: "" },
    { type: "website", link: "/", display_link: "" }
  ];

  /**
   * This structure is a bit complex, but it allows us to seperate out links from the html structure.
   * Its a list of two lists of links with titles, the first list is in the left column and the second in the right.
   * If we are on a small screen, the two lists are shown on top of each other.
   */
  const linksWithCategory: Record<string, ([Page] | [string, string])[]>[] = [
    {
      [t("common", "ourServices")]: [["boka"], ["behandlingar"], ["terapeuter"], ["artiklar"]],
      [t("common", "information")]: [["om"], ["hitta"], ["sekretess"]]
    },
    {
      [t("common", "partners")]: [
        ["/", "Fysioreapeuterna"],
        ["/", "Sveriges Naprapater"],
        ["/", "Fysio"],
        ["/", "LiU"]
      ],
      [t("common", "readMore")]: [
        ["/", "1177"],
        ["/", "Naprapati och Kiropraktik"],
        ["/", "Kvinnohälsa"],
        ["/", "Starta eget"]
      ]
    }
  ];

  function toLinks(links: ([Page] | [string, string])[]): [string, string][] {
    return links.map((link) => {
      if (link.length === 1) {
        return [l(link[0]), t("common", link[0])];
      }
      return link;
    });
  }
</script>

<footer
  class="border-tertiary-200 bg-error-50 mt-16 border-t pb-8 pt-16 sm:pt-24"
  aria-labelledby="footer-heading"
>
  <Container>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="flex flex-col items-center space-y-8">
        <a href={l("hem")} class="btn-icon w-32"><Logo class="text-surface-700" /> </a>
        <div class="flex space-x-6">
          {#each socialLinks as link}
            <SocialLink {link} class="text-tertiary-400 hover:text-tertiary-500" />
          {/each}
        </div>
      </div>
      <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <div>
          <h3 class="text-tertiary-900 text-sm font-semibold leading-6">{t("common", "hitta")}</h3>
          <ul class="mt-6 space-y-4">
            <li>
              <SocialLink
                link={{
                  type: "location",
                  link: "/",
                  display_link: "Xxxxxxxxxx xx | xxx xx Linköping"
                }}
                class="text-tertiary-600 hover:text-tertiary-900 flex gap-x-4 text-sm leading-6 xl:-ml-10"
                onlyIcon={false}
              />
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-tertiary-900 text-sm font-semibold leading-6">
            {t("common", "contact")}
          </h3>
          <ul class="mt-6 space-y-4">
            <li>
              <SocialLink
                link={{
                  type: "email",
                  link: "mailto: info@curarehab.se",
                  display_link: "info@curarehab.se"
                }}
                class="text-tertiary-600 hover:text-tertiary-900 flex gap-x-4 text-sm leading-6 xl:-ml-10"
                onlyIcon={false}
              />
            </li>
            <li>
              <SocialLink
                link={{
                  type: "phone",
                  link: "tel: +46700000000",
                  display_link: "0700-000000"
                }}
                class="text-tertiary-600 hover:text-tertiary-900 flex gap-x-4 text-sm leading-6 xl:-ml-10"
                onlyIcon={false}
              />
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
                <h3 class="text-tertiary-900 text-sm font-semibold leading-6">{title}</h3>
                <ul class="mt-6 space-y-4">
                  {#each toLinks(links) as [href, linkTitle]}
                    <li>
                      <a {href} class="text-tertiary-600 hover:text-tertiary-900 text-sm"
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
    <div class="border-tertiary-900/10 mt-16 flex space-x-1 border-t pt-8 sm:mt-20 lg:mt-24">
      <p class="text-tertiary-500 text-xs leading-5">
        &copy; {new Date().getFullYear()}
        {t("common", "title")} Linköping AB
      </p>
    </div>
  </Container>
</footer>
