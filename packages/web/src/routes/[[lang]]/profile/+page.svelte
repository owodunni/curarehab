<script lang="ts">
  import { Button, Container, HeroComponent } from "$lib/components";
  import { t } from "$lib/i18n";
  import type { PageData } from "./$types";

  export let data: PageData;
  const posts = data.bloggPosts || [];
  let showDialog = false;

  let submitted = false;

  async function handleSubmit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await data.supabase.from("blogg").insert([
      {
        title: formData.get("title") as string,
        excerpt: formData.get("excerpt") as string,
        post: formData.get("article") as string,
        author: data.user.id,
        updated_at: new Date().toISOString(),
        locale: "sv"
      }
    ]);
    if (res.error) {
      console.error(res.error);
    } else {
      showDialog = false;
      window.location.reload();
    }
  }
</script>

{#if !showDialog}
  <HeroComponent>
    <div class="flex h-full max-w-sm flex-col lg:w-96">
      <h2 class="flex-1 text-4xl font-bold tracking-tight text-gray-900">
        {$t("profile", "welcome", { default: data.user.email })}
      </h2>

      <div class="mt-14 flex gap-2">
        <Button class="w-full" variant="outline">{$t("profile", "logOut")}</Button>
      </div>
    </div>
  </HeroComponent>
  <Container>
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Artiklar</h1>
          <p class="mt-2 text-sm text-gray-700">Lista på alla dina artiklar</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button on:click={() => (showDialog = true)}>Skapa artikel</Button>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >Title</th
                  >
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Sammanfattning</th
                  >
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Språk</th
                  >
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Skapad</th
                  >
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >Updaterad</th
                  >
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span class="sr-only">Updatera</span>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span class="sr-only">Ta bort</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                {#each posts as post, i}
                  <tr>
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      >{post.title}</td
                    >
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >{post.excerpt}</td
                    >
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.locale}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString("sv-SE")}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(post.updated_at).toLocaleDateString("sv-SE")}</td>
                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                    >
                      <Button href="#" variant="outline"
                        >Updatera</Button>
                    </td>
                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8"
                    >
                      <Button href="#" variant="outline"
                        >Ta bort</Button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Container>
{:else}
  <Container class="pb-8">
    <form action="#" class:submitted on:submit|preventDefault={handleSubmit}>
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >Title</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Lorem ipsum dolor."
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label for="excerpt" class="block text-sm font-medium leading-6 text-gray-900"
                >Sammanfattning</label
              >
              <div class="mt-2">
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="3"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
                  class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="article" class="block text-sm font-medium leading-6 text-gray-900"
                >Artikel</label
              >
              <div class="mt-2">
                <textarea
                  id="article"
                  name="article"
                  rows="3"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
                  class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <Button variant="outline" class="w-full" on:click={() => (showDialog = false)}
            >Cancel</Button
          >
          <Button class="w-full" on:click={() => (submitted = true)}>Create</Button>
        </div>
      </div>
    </form>
  </Container>
{/if}
