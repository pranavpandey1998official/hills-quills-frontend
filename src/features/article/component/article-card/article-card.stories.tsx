import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleCard } from "./article-card";
import { Article } from "@/features/article/types";
import { Category, ImageFile, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleCard> = {
  title: "articles/ArticleCard/Default",
  component: ArticleCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A card component for displaying article information with optional badges and hover effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    article: {
      description: "Article object containing details like title, description, image, and metadata.",
      control: { type: "object" },
    },
    imageHeight: {
      description: "Height of the article image.",
      control: { type: "text" },
    },
    showRegionBadge: {
      description: "Toggle to show the region badge.",
      control: { type: "boolean" },
    },
    showCategoryBadge: {
      description: "Toggle to show the category badge.",
      control: { type: "boolean" },
    },
    showReadMoreBadge: {
      description: "Toggle to show the 'Read More' badge.",
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const mockArticle: Article = {
  id: 1,
  title: "Exploring the Majestic Himalayas",
  image:  {
    previewUrl: "/images/temple-story.jpg",
  },
  created_at: "2025-08-15T10:00:00Z",
  region: Region.Nainital,
  category: Category.Environment,
  updated_at: "2025-08-15T10:00:00Z",
  publish_date: "2025-08-15T10:00:00Z",
  status: Status.Approved,
  author_id: 1,
  content: "The Uttarakhand government has announced a groundbreaking eco-tourism initiative...",
  rejection_reason: null,
};

export const Default: Story = {
  args: {
    article: mockArticle,
    imageHeight: "h-48",
    showRegionBadge: true,
    showCategoryBadge: true,
    showReadMoreBadge: true,
  },
};


export const Minimal: Story = {
  args: {
    article: mockArticle,
    imageHeight: "h-32",
    showRegionBadge: false,
    showCategoryBadge: false,
    showReadMoreBadge: false,
  },
};