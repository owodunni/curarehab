import type { BlogPostMetaData, SupabaseUtil } from "./types";

export const util = (): SupabaseUtil => {
  return {
    getRouteToPost: async (post: BlogPostMetaData) => {
      const prefix = post.locale === "en" ? `/${post.locale}/artiklar` : "/artiklar";
      return `${prefix}/${post.slug}`;
    }
  };
};
