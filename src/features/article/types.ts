import z from "zod";

import { Category, ImageFile, Region , Status} from "@/types/common";


// Zod schema
export const ArticleViewSchema = z.object({
  id: z.number(),
  author_id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.enum(Category),
  region: z.enum(Region),
  image: z.string().transform((val): ImageFile => ({
    previewUrl: val,
  })),
  updated_at: z.string(),
  rejection_reason: z.string().optional().nullable(),
});

export const ArticleViewWithAuthorSchema = ArticleViewSchema.extend({
  tags: z.array(z.string()),
  author_name: z.string(),
  author_email: z.string(),
  author_profile_photo_url: z.string().optional(),
  author_about: z.string().optional(),
  author_profession: z.string().optional(),
});

export type ArticleViewWithAuthor = z.infer<typeof ArticleViewWithAuthorSchema>;

// Type inference (if you want Zod type instead of interface)
export type ArticleView = z.infer<typeof ArticleViewSchema>;

export const ArticleSchema = ArticleViewSchema.extend({
  publish_date: z.string().nullable(),
  created_at: z.string(),
  status: z.enum(Status),
});

export type Article = z.infer<typeof ArticleSchema>;


export type ArticleUpdates = {
  title?: string;
  content?: string;
  category?: string;
  region?: string;
  imageFile?: ImageFile;
  tags?: string[];
}


