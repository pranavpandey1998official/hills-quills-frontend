import type { Meta, StoryObj } from "@storybook/react";
import { ArticleCard } from "./article-card";
import { Article } from "@/types/articles";

const meta: Meta<typeof ArticleCard> = {
  title: "Components/Articles/ArticleCard",
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
    showDescription: {
      description: "Toggle to show or hide the article description.",
      control: { type: "boolean" },
    },
    imageHeight: {
      description: "Height of the article image.",
      control: { type: "text" },
    },
    showBadgesOnHover: {
      description: "Toggle to show badges only on hover.",
      control: { type: "boolean" },
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
    enableComplexHoverEffects: {
      description: "Toggle to enable complex hover effects on the image.",
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const mockArticle: Article = {
  id: "1",
  title: "Exploring the Majestic Himalayas",
  description: "Discover the breathtaking beauty and cultural richness of the Himalayan region. From serene landscapes to vibrant traditions, the Himalayas offer an unforgettable experience.",
  image: "/images/temple-story.jpg",
  created_at: "2025-08-15T10:00:00Z",
  region: "Uttarakhand",
  category: "Travel",
  tags: ["Himalayas", "Adventure", "Culture"],
};

export const Default: Story = {
  args: {
    article: mockArticle,
    showDescription: true,
    imageHeight: "h-48",
    showBadgesOnHover: true,
    showRegionBadge: true,
    showCategoryBadge: true,
    showReadMoreBadge: true,
    enableComplexHoverEffects: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    article: mockArticle,
    showDescription: false,
    imageHeight: "h-48",
    showBadgesOnHover: true,
    showRegionBadge: true,
    showCategoryBadge: true,
    showReadMoreBadge: true,
    enableComplexHoverEffects: true,
  },
};

export const Minimal: Story = {
  args: {
    article: mockArticle,
    showDescription: false,
    imageHeight: "h-32",
    showBadgesOnHover: false,
    showRegionBadge: false,
    showCategoryBadge: false,
    showReadMoreBadge: false,
    enableComplexHoverEffects: false,
  },
};