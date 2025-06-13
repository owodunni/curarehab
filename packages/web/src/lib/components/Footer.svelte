<script lang="ts">
  import Container from './Container.svelte';
  import type { T, L } from '$lib/i18n/t';
  import type { Page } from '$lib/i18n';
  import Logo from './Logo.svelte';
  import type { Link } from '$lib/api';
  import SocialLink from './SocialLink.svelte';

  let {
    t,
    l,
    locale,
    socialLinks = [],
    columnLinks = [[], []],
    email,
    location,
    phone,
  }: {
    t: T;
    l: L;
    locale: 'sv' | 'en';
    socialLinks?: Link[];
    columnLinks?: [Link[], Link[]];
    email?: Link | undefined;
    location?: Link | undefined;
    phone?: Link | undefined;
  } = $props();

  /**
   * This structure is a bit complex, but it allows us to seperate out links from the html structure.
   * Its a list of two lists of links with titles, the first list is in the left column and the second in the right.
   * If we are on a small screen, the two lists are shown on top of each other.
   */
  let linksWithCategory = $derived([
    {
      [t('common', 'ourServices')]: [
        {
          link: t('common', 'hanoLink'),
          display_link: t('common', 'boka'),
          type: 'website',
        },
        ['behandlingar'],
        ['terapeuter'],
        ...(locale === 'sv' ? [['skadekompassen'] as const satisfies [Page]] : []),
      ],
      [t('common', 'information')]: [['om'], ['hitta'], ['personuppgiftspolicy'], ['cookies']],
    },
    {
      [t('common', 'partners')]: columnLinks[0],
      [t('common', 'readMore')]: [
        ...(locale === 'sv' ? [['artiklar'] as const satisfies [Page]] : []),
        {
          link: t('common', 'fysioHref'),
          display_link: t('common', 'fysioLinkTitle'),
          type: 'website',
        },
        {
          link: t('common', 'naprapatHref'),
          display_link: t('common', 'naprapatLinkTitle'),
          type: 'website',
        },
        ...columnLinks[1],
      ],
    },
  ] as const satisfies readonly Record<string, ([Page] | Link)[]>[]);

  function toLinks(links: ([Page] | Link)[]): [string, string][] {
    return links.map((link) => {
      if (Array.isArray(link)) {
        return [l(link[0]), t('common', link[0])];
      }
      return [link.link, link.display_link];
    });
  }
</script>

<footer class="theme-skog-dark bg-section pb-8 pt-16 sm:pt-24" aria-labelledby="footer-heading">
  <Container>
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="flex flex-col items-center space-y-8">
        <a href={l('hem')} class="btn-icon w-32" aria-label={t('common', 'title')}
          ><Logo class="text-theme-body hover:text-theme-muted-hover w-32 transition-colors" />
        </a>
        <div class="flex space-x-6">
          {#each socialLinks as link (link.link)}
            <SocialLink {link} class="text-theme-body hover:text-theme-muted-hover" />
          {/each}
        </div>
      </div>
      <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
        <div>
          <h3 class="text-theme-heading text-sm font-semibold leading-6">{t('common', 'hitta')}</h3>
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
            {t('common', 'contact')}
          </h3>
          <ul class="mt-6 space-y-4">
            {#each [email, phone] as link (link?.link || link)}
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
      <div></div>
      <div class="col-start-2 mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 xl:grid-cols-4">
        {#each linksWithCategory as outerLinks (JSON.stringify(outerLinks))}
          {#each Object.entries(outerLinks) as [title, links] (title)}
            <div class="mt-0">
              <h3 class="text-theme-body text-sm font-semibold leading-6">{title}</h3>
              <ul class="mt-6 space-y-4">
                {#each toLinks(links) as [href, linkTitle] (href)}
                  <li>
                    <a {href} class="text-theme-muted hover:text-theme-muted-hover text-sm"
                      >{linkTitle}</a
                    >
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        {/each}
      </div>
    </div>
    <div class="border-theme-div mt-16 flex space-x-1 border-t pt-8 sm:mt-20 lg:mt-24">
      <p class="text-theme-muted text-xs leading-5">
        &copy; {new Date().getFullYear()}
        {t('common', 'title')} Linköping AB
      </p>
    </div>
  </Container>
</footer>
