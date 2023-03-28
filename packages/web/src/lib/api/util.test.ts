import { describe, expect, it } from "vitest";
import { mock } from "vitest-mock-extended";
import type { BlogPost, SupabaseLightClient } from "./types";
import { util } from "./util";

const getPosts = () => {
  const p0: BlogPost = {
    author: "",
    created_at: "",
    excerpt: "",
    id: 0,
    locale: "",
    parent: null,
    post: "",
    published: false,
    slug: "pain",
    title: "",
    updated_at: ""
  };

  const p1: BlogPost = {
    author: "",
    created_at: "",
    excerpt: "",
    id: 1,
    locale: "",
    parent: 0,
    post: "",
    published: false,
    slug: "back",
    title: "",
    updated_at: ""
  };

  const p2: BlogPost = {
    author: "",
    created_at: "",
    excerpt: "",
    id: 2,
    locale: "",
    parent: 1,
    post: "",
    published: false,
    slug: "extream",
    title: "",
    updated_at: ""
  };

  return [p0, p1, p2];
};

describe("supabase util", () => {
  it("getLinkToArticle", async () => {
    const supabase = mock<SupabaseLightClient>();
    const { getRouteToPost } = util(supabase);
    const posts = getPosts();
    const [p0, p1, p2] = posts;
    supabase.getBlogPostsMetaData.mockResolvedValue(posts);

    expect(await getRouteToPost(p0)).toBe("/pain");
    expect(await getRouteToPost(p1)).toBe("/pain/back");
    expect(await getRouteToPost(p2)).toBe("/pain/back/extream");
  });

  it("getPostFromRoute", async () => {
    const supabase = mock<SupabaseLightClient>();
    const { getPostFromRoute } = util(supabase);
    const posts = getPosts();
    const [p0, p1, p2] = posts;
    supabase.getBlogPostsMetaData.mockResolvedValue(posts);

    supabase.getBlogPost.mockResolvedValueOnce(p0);
    expect(await getPostFromRoute("pain")).toBe(p0);

    supabase.getBlogPost.mockResolvedValueOnce(p1);
    expect(await getPostFromRoute("pain/back")).toBe(p1);

    supabase.getBlogPost.mockResolvedValueOnce(p2);
    expect(await getPostFromRoute("pain/back/extream")).toBe(p2);
  });
});
