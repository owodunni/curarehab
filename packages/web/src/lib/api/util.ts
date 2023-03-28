import type { BlogPostMetaData, SupabaseLightClient, SupabaseUtil } from "./types";

function getRouteFromPosts(post: Required<BlogPostMetaData>, posts: Map<number, BlogPostMetaData>) {
  const route: string[] = [];
  function addPostToRouteReqursive(post: BlogPostMetaData): string[] {
    route.push(post.slug);
    if (post.parent === null) return route;
    const parent = posts.get(post.parent);
    if (parent) return addPostToRouteReqursive(parent);
    return route;
  }
  return `/${addPostToRouteReqursive(post).reverse().join("/")}`;
}

export const util = (supabase: SupabaseLightClient): SupabaseUtil => {
  return {
    getRouteToPost: async (post: BlogPostMetaData) => {
      if (post.parent === null) {
        return `/${post.slug}`;
      }

      const posts = await supabase.getBlogPostsMetaData();
      return "code" in posts
        ? posts
        : getRouteFromPosts(post, new Map(posts.map((p) => [p.id, p])));
    },
    getPostFromRoute: async (slugs: string) => {
      // We want the slugs in reverse order, so we can start with the leaf and then go up the tree
      const slugList = slugs.split("/").reverse();
      const [post, posts] = await Promise.all([
        supabase.getBlogPost(slugList[0]),
        supabase.getBlogPostsMetaData()
      ]);
      if ("code" in post) {
        return post;
      } else if (post.parent === null && slugList.length === 1) {
        return post;
      } else if (post.parent !== null && slugList.length === 1) {
        return { code: 404, message: "Article not found" };
      }

      if ("code" in posts) return posts;

      const postsMap = new Map(posts.map((p) => [p.id, p]));

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
