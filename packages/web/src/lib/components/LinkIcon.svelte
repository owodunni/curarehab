<script lang="ts">
  import { PhoneIcon, GlobeAltIcon } from "@rgossiaux/svelte-heroicons/solid";
  import type { LinkType } from "./Icons/types";
  import Email from "./Icons/Email.svelte";
  import Facebook from "./Icons/Facebook.svelte";
  import Instagram from "./Icons/Instagram.svelte";
  import Linkedin from "./Icons/Linkedin.svelte";
  import Twitter from "./Icons/Twitter.svelte";
  import Youtube from "./Icons/Youtube.svelte";
  import Github from "./Icons/Github.svelte";
  import Location from "./Icons/Location.svelte";
  import TikTok from "./Icons/TikTok.svelte";
  export let type: LinkType;

  function component(type: LinkType) {
    switch (type) {
      case "email":
        return Email;
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      case "linkedin":
        return Linkedin;
      case "twitter":
        return Twitter;
      case "youtube":
        return Youtube;
      case "github":
        return Github;
      case "phone":
        return PhoneIcon;
      case "location":
        return Location;
      case "tiktok":
        return TikTok;
      case "website":
      case "webpage":
        return GlobeAltIcon;
      default:
        console.warn(`No icon for ${type}`);
        return null;
    }
  }

  let clazz = "";
  export { clazz as class };
</script>

<span class="sr-only">{type}</span>
<svelte:component this={component(type)} class={clazz} />
