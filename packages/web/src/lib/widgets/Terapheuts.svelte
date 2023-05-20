<script lang="ts">
  import type { L } from "$lib/i18n/t";
  import type { TerapheutMetaData } from "@curarehab/api";

  export let l: L;
  export let terapheuts: TerapheutMetaData[] = [];
</script>

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        We’re a dynamic group of individuals who are passionate about what we do and dedicated to
        delivering the best results for our clients.
      </p>
    </div>
    <ul
      class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      {#each terapheuts as terapheut}
        <li>
          <img
            class="aspect-[3/2] w-full rounded-2xl object-cover"
            src={terapheut.profile_photo}
            alt=""
          />
          <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
            {terapheut.first_name}
            {terapheut.last_name}
          </h3>
          <p class="text-base leading-7 text-gray-600">{terapheut.title}</p>
          <ul class="mt-6 flex gap-x-6">
            <li>
              <a href={`${l("terapeuter")}/${terapheut.user_id}`} class="btn btn-sm variant-soft">
                Läs mer
              </a>
            </li>
            <li>
              <a href={`${l("terapeuter")}/${terapheut.user_id}`} class="btn btn-sm variant-filled">
                Boka nu
              </a>
            </li>
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</div>
