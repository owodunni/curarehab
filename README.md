# CuraRehab

This is the source code for the [CuraRehab](https://curarehab.se) website. This is a high performance static site, that is easy to work with
and cheap to maintain. The site is built using [SvelteKit](https://kit.svelte.dev/) and uses a selfhosted [directus](https://directus.io/) instance as a headless CMS.
The site is hosted on [Cloudflare Pages](https://pages.cloudflare.com/) where it is statically built, making it so that directus is only used when builing the site.
This removes any worries about security and performance. Images are uploaded to s3 and served through CloudFront using [image-optimization](https://github.com/aws-samples/image-optimization)
to get a cheap and fast image CDN that supports resizing and formatting.

The result is a high performance site that is a joy to work with and doesn't limit what can be built.
But don't take my word for it check out our [Unlighthouse](https://unlighthouse.dev) scores!

- [release - static](https://curarehab-reports.pages.dev/)
- [master - dynamic](https://master.curarehab-reports.pages.dev/)

## Release

Create a GitHub Release this will trigger a merge into the Release branch. The release branch automatically triggers a CloudFlare pages deployment
to production.

## SEO

We want to get good search rankings. There are a couple of tools that we use to check the SEO of the site.

- [Google Search Console](https://search.google.com/search-console?resource_id=sc-domain%3Acurarehab.se) - This is the main tool for checking the SEO of the site. It will show you
  how Google sees the site and what issues it has with the site.
- [Webmaster](https://www.bing.com/webmasters?siteUrl=https%3A%2F%2Fcurarehab.se%2F) - Shows how Bing sees the site.

## Analytics

We also use [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) to track the traffic to the site.

## Fonts

How hard can fonts be? Pick a font and use it. Well, it turns out that fonts are hard. We want to use a font that is easy to read and looks good. We also want to use a font that loading fonts blocks when the page can load if
we don't want to swap which font we render with midway through rendering.

First key is to reduce font sizes. This can be done by subsetting the font, removing any characters we don't need.

Install [fonttools](https://pypi.org/project/fonttools/) with extra dependencies.

```
pip install fonttools 'fonttools[ufo,lxml,woff2,unicode]'
```

Decide which unicode characters we need. We can use [unicode-table.com](https://unicode-table.com/en/) to find the unicode characters we need.

I went with `U+0000-00FF` which is the basic latin characters. This includes the characters we need for Swedish and English.

Then subset the font.

```
pyftsubset Inter-italic.var.woff2 --unicodes-file=unicodes.txt --flavor='woff2' --output-file="Inter-italic.var-minimal.woff2" --with-zopfli
```

Here is a guide that I [followed](https://markoskon.com/creating-font-subsets/). Once we have the font we want to load it, that can be done
in out app.css file. However then we don't load untill we have loaded the css. We can preload the font by adding the following to `index.html`

```
<link rel="preload" href="%sveltekit.assets%/fonts/Inter-italic.var-minimal.woff2" as="font" type="font/woff2" crossorigin>
```

Crossorigin is only needed when loading from CDN.

### issues

I didn't quite get the preloading to work. The font is not optimized by vite causing a different hash and it ends up being loaded twice instead of once.
