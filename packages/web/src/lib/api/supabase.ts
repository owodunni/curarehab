export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      blog: {
        Row: {
          author: string;
          created_at: string;
          excerpt: string;
          id: number;
          locale: string;
          parent: number | null;
          post: string;
          published: boolean;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author: string;
          created_at?: string;
          excerpt?: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string;
          published?: boolean;
          slug: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          author?: string;
          created_at?: string;
          excerpt?: string;
          id?: number;
          locale?: string;
          parent?: number | null;
          post?: string;
          published?: boolean;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
