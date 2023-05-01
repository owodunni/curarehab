import type { BlogPostMetaData, SupabaseUtil } from "./types";

export const util = (): SupabaseUtil => {
  return {
    getRouteToPost: async (post: BlogPostMetaData) => {
      const prefix = post.locale === "en" ? `/${post.locale}/blog` : "/blog";
      return `${prefix}/${post.slug}`;
    }
  };
};
