import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleCardSquareHorizontal from "./article-card-square-hotizontal";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleCardSquareHorizontal> = {
  title: "articles/ArticleCard/SquareHorizontal",
  component: ArticleCardSquareHorizontal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A horizontal article card component with a square image on the left and article details on the right. Perfect for featured content and article listings.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    article: {
      description: "Article object containing details like title, image, region, and updated date.",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCardSquareHorizontal>;

const mockArticle: Article = {
  id: 1,
  title: "Uttarakhand's New Sustainable Tourism Initiative Transforms Local Communities",
  image: {
    previewUrl: "/images/temple-story.jpg",
  },
  created_at: "2024-01-15T10:00:00Z",
  region: Region.Nainital,
  category: Category.Tourism,
  updated_at: "2 hours ago",
  publish_date: "2024-01-15T10:00:00Z",
  status: Status.Approved,
  author_id: 1,
  content: "The Uttarakhand government has launched an ambitious sustainable tourism program that's creating new opportunities for local communities while preserving the state's natural beauty...",
  rejection_reason: null,
};

const longTitleArticle: Article = {
  ...mockArticle,
  id: 2,
  title: "Breaking: Historic Agreement Signed Between Uttarakhand Government and Environmental Groups for Long-Term Conservation of Himalayan Ecosystems",
  region: Region.Dehradun,
  category: Category.Environment,
  updated_at: "1 day ago",
};

const shortTitleArticle: Article = {
  ...mockArticle,
  id: 3,
  title: "New Tech Hub Opens",
  region: Region.Haridwar,
  category: Category.Politics,
  updated_at: "3 days ago",
};

const cultureArticle: Article = {
  ...mockArticle,
  id: 4,
  title: "Ancient Festivals of Kumaon: Preserving Cultural Heritage in Modern Times",
  region: Region.Almora,
  category: Category.Culture,
  updated_at: "1 week ago",
  image: {
    previewUrl: "/images/licensed-image.jpg",
  },
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const LongTitle: Story = {
  args: {
    article: longTitleArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a long title that wraps to multiple lines, demonstrating how the component handles text overflow.",
      },
    },
  },
};

export const ShortTitle: Story = {
  args: {
    article: shortTitleArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a short title, showing how the component adapts to minimal content.",
      },
    },
  },
};

export const CultureCategory: Story = {
  args: {
    article: cultureArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Example featuring a culture category article with different content and styling.",
      },
    },
  },
};

export const NoImage: Story = {
  args: {
    article: {
      ...mockArticle,
      image: {
        previewUrl: "",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing how the component handles articles without images, falling back to placeholder.",
      },
    },
  },
};

// Multiple cards to show in a list layout
export const InList: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <ArticleCardSquareHorizontal article={mockArticle} />
      <ArticleCardSquareHorizontal article={longTitleArticle} />
      <ArticleCardSquareHorizontal article={cultureArticle} />
      <ArticleCardSquareHorizontal article={shortTitleArticle} />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Multiple article cards displayed in a vertical list layout, perfect for article listings and feeds.",
      },
    },
  },
};
