import type { Meta, StoryObj } from "@storybook/react";
import ArticleCardRectangleHorizontal from "./article-card-reactangle-horizontal";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleCardRectangleHorizontal> = {
  title: "molecules/ArticleCard/RectangleHorizontal",
  component: ArticleCardRectangleHorizontal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A compact horizontal article card component with a small rectangular image on the left and article details on the right. Features category badge, title, and timestamp. Perfect for sidebar content and compact article listings.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    article: {
      description: "Article object containing details like title, image, category, and updated date.",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCardRectangleHorizontal>;

const mockArticle: Article = {
  id: 1,
  title: "Dehradun Smart City Project Enters Second Phase with Digital Infrastructure Upgrades",
  image: {
    previewUrl: "/images/temple-story.jpg",
  },
  created_at: "2024-01-15T10:00:00Z",
  region: Region.Dehradun,
  category: Category.Politics,
  updated_at: "2 hours ago",
  publish_date: "2024-01-15T10:00:00Z",
  status: Status.Approved,
  author_id: 1,
  content: "The Dehradun Smart City initiative has entered its second phase with major digital infrastructure developments...",
  rejection_reason: null,
};

const environmentArticle: Article = {
  ...mockArticle,
  id: 2,
  title: "Wildlife Conservation Efforts Show Positive Results in Uttarakhand National Parks",
  category: Category.Environment,
  region: Region.Nainital,
  updated_at: "4 hours ago",
  image: {
    previewUrl: "/images/licensed-image.jpg",
  },
};

const healthArticle: Article = {
  ...mockArticle,
  id: 3,
  title: "New Medical College to Open in Haridwar, Boosting Healthcare Infrastructure",
  category: Category.Health,
  region: Region.Haridwar,
  updated_at: "1 day ago",
  image: {
    previewUrl: "/images/licensed-image-2.jpg",
  },
};

const economyArticle: Article = {
  ...mockArticle,
  id: 4,
  title: "Startup Ecosystem Flourishes in Hill Stations with Government Support",
  category: Category.Economy,
  region: Region.Almora,
  updated_at: "2 days ago",
};

const longTitleArticle: Article = {
  ...mockArticle,
  id: 5,
  title: "Revolutionary Climate Change Adaptation Program Launched Across Multiple Districts of Uttarakhand with International Collaboration and Funding",
  category: Category.Environment,
  region: Region.Chamoli,
  updated_at: "3 days ago",
};

const shortTitleArticle: Article = {
  ...mockArticle,
  id: 6,
  title: "Tourism Boost Expected",
  category: Category.Tourism,
  region: Region.Pithoragarh,
  updated_at: "5 days ago",
};

const cultureArticle: Article = {
  ...mockArticle,
  id: 7,
  title: "Traditional Kumaoni Arts Gaining International Recognition Through Digital Platforms",
  category: Category.Culture,
  region: Region.Bageshwar,
  updated_at: "1 week ago",
};

const defenceArticle: Article = {
  ...mockArticle,
  id: 8,
  title: "Border Security Enhanced with Advanced Surveillance Technology in High Altitude Areas",
  category: Category.Defence,
  region: Region.Uttarkashi,
  updated_at: "2 weeks ago",
};

export const Default: Story = {
  args: {
    article: mockArticle,
  },
};

export const Environment: Story = {
  args: {
    article: environmentArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Environment category article showcasing wildlife conservation efforts.",
      },
    },
  },
};

export const Health: Story = {
  args: {
    article: healthArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Health category article about medical infrastructure development.",
      },
    },
  },
};

export const Economy: Story = {
  args: {
    article: economyArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Economy category article featuring startup ecosystem growth.",
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    article: longTitleArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a very long title that gets truncated with ellipsis using line-clamp-2.",
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
        story: "Example with a short, concise title showing minimal content layout.",
      },
    },
  },
};

export const Culture: Story = {
  args: {
    article: cultureArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Culture category article highlighting traditional arts and digital platforms.",
      },
    },
  },
};

export const Defence: Story = {
  args: {
    article: defenceArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Defence category article about border security enhancements.",
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
        story: "Example showing fallback behavior when article image is missing or empty.",
      },
    },
  },
};

// Sidebar layout with multiple cards
export const SidebarList: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
      <ArticleCardRectangleHorizontal article={environmentArticle} />
      <ArticleCardRectangleHorizontal article={healthArticle} />
      <ArticleCardRectangleHorizontal article={economyArticle} />
      <ArticleCardRectangleHorizontal article={cultureArticle} />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Multiple compact cards in a sidebar layout, perfect for 'Related Articles' or 'Trending News' sections.",
      },
    },
  },
};

// Grid layout showing responsive behavior
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <ArticleCardRectangleHorizontal article={mockArticle} />
      <ArticleCardRectangleHorizontal article={environmentArticle} />
      <ArticleCardRectangleHorizontal article={healthArticle} />
      <ArticleCardRectangleHorizontal article={economyArticle} />
      <ArticleCardRectangleHorizontal article={cultureArticle} />
      <ArticleCardRectangleHorizontal article={defenceArticle} />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Cards displayed in a responsive grid layout, showing how they adapt to different screen sizes and container widths.",
      },
    },
  },
};

// All categories showcase
export const AllCategories: Story = {
  render: () => (
    <div className="space-y-4 max-w-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6">All News Categories</h3>
      <div className="space-y-3">
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Politics, title: "Political Updates from State Capital" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Environment, title: "Environmental Conservation Progress" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Health, title: "Healthcare System Improvements" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Economy, title: "Economic Development Initiatives" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Education, title: "Educational Reform Implementation" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Culture, title: "Cultural Heritage Preservation" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Tourism, title: "Tourism Industry Growth" }} />
        <ArticleCardRectangleHorizontal article={{ ...mockArticle, category: Category.Defence, title: "Defense Sector Developments" }} />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Showcase of all available news categories with their respective badge colors and styling.",
      },
    },
  },
};
