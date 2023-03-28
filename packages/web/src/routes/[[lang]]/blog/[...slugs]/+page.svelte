<script lang="ts">
  import { Container } from "$lib/components";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<Container>
  <article class="prose">
    {@html data.post.html}
  </article>
</Container>
