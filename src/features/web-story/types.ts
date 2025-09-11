import z from "zod";
import { Category, ImageFile, Region, Status } from "../../types/common";

export const StorySchema = z.object({
  id: z.number(),
  title: z.string(),
  author_id: z.number(),
  cover_image_url: z.string().transform((val): ImageFile => ({
    previewUrl: val,
  })),
  status: z.enum(Status),
  region: z.enum(Region),
  rejection_reason: z.string().nullable().optional(),
  category: z.enum(Category),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Story = z.infer<typeof StorySchema>;

export const SlideSchema = z.object({
  id: z.number(),
  slide_order: z.number(),
  web_story_id: z.number(),
  image_url: z.string().transform((val): ImageFile => ({
    previewUrl: val,
  })),
  caption: z.string(),
  duration: z.number(),
});

export type Slide = z.infer<typeof SlideSchema>;


export const SlideViewSchema = z.object({
  id: z.number(),
  slide_order: z.number(),
  web_story_id: z.number(),
  image_url: z.url(),
  caption: z.string(),
  duration: z.number(),
});


export const StoryViewSchema = z.object({
  id: z.number(),
  title: z.string(),
  author_id: z.number(),
  cover_image_url: z.url(),
  region: z.string(),
  rejection_reason: z.string().nullable(),
  category: z.string(),
  updated_at: z.string(),
  slides: z.array(SlideViewSchema),
  tags: z.array(z.string()),
});

export type StoryView = z.infer<typeof StoryViewSchema>;