import type { BlogPostMetaData, SupabaseLightClient, SupabaseUtil } from "./types";

const cacheable = <T>(fn: () => T, duration: number) => {
  let cache: T;
  let lastUpdate = 0;
  return () => {
    const now = Date.now();
    if (now - lastUpdate > duration) {
      cache = fn();
      lastUpdate = now;
    }
    return cache;
  };
};

export const util = (supabase: SupabaseLightClient): SupabaseUtil => {
  const postsCache = cacheable(async () => {
    const data = await supabase.getBlogPostsMetaData();
    if ("code" in data) throw new Error(data.message);
    return new Map(data.map((p) => [p.id, p]));
  }, 200);

  async function getRouteFromPosts(post: Required<BlogPostMetaData>): Promise<string> {
    const route: string[] = [];
    async function addPostToRouteReqursive(post: BlogPostMetaData): Promise<string[]> {
      route.push(post.slug);
      if (post.parent === null) return route;
      const parent = (await postsCache()).get(post.parent);
      if (parent) return addPostToRouteReqursive(parent);
      return route;
    }
    return `${(await addPostToRouteReqursive(post)).reverse().join("/")}`;
  }

  return {
    getRouteToPost: async (post: BlogPostMetaData) => {
      const prefix = post.locale === "en" ? `/${post.locale}/blog` : "/blog";
      if (post.parent === null) {
        return `${prefix}/${post.slug}`;
      }

      return `${prefix}/${await getRouteFromPosts(post)}`;
    },
    getPostFromRoute: async (slugs?: string) => {
      if (!slugs) return { code: 404, message: "Article not found" };
      // We want the slugs in reverse order, so we can start with the leaf and then go up the tree
      const slugList = slugs.split("/").reverse();
      const post = await supabase.getBlogPost(slugList[0] || "");
      if ("code" in post) {
        return post;
      } else if (post.parent === null && slugList.length === 1) {
        return post;
      } else if (post.parent !== null && slugList.length === 1) {
        return { code: 404, message: "Article not found" };
      }

      const postsMap = await postsCache();

      //return supabase.getBlogPost(slugList[0]);
      function checkSlugRecursive(slugs: string[], post: BlogPostMetaData): boolean {
        // Slug does not match
        if (post.slug !== slugs[0]) return false;
        // Slug matches, and we have checked all posts
        if (slugs.length === 1 && post.parent === null) return true;
        if (post.parent === null) return false;
        const parent = postsMap.get(post.parent);
        if (!parent) return false;
        // Slug matches, but we have not checked all posts
        return checkSlugRecursive(slugs.slice(1), parent);
      }

      if (checkSlugRecursive(slugList, post)) return post;
      return { code: 404, message: "Article not found" };
    }
  };
};
