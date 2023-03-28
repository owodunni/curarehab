<script lang="ts">
  import { Container } from "$lib/components";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<Container>
  <h1>{data.post.title}</h1>
  <article class="prose">
    {@html data.post.html.code}
  </article>
</Container>
