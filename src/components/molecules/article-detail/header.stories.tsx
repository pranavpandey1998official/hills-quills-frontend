import type { Meta, StoryObj } from "@storybook/react";
import NewsArticle from "./header";
import { ArticleViewWithAuthor, Category, Region } from "@/types/articles";

const meta: Meta<typeof NewsArticle> = {
  title: "molecules/ArticleDetailHeader",
  component: NewsArticle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A news article header component that displays article metadata, title, author info, action buttons, and hero image with proper styling and interactive elements.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "Unique identifier for the article",
      control: { type: "number" },
    },
    title: {
      description: "The article title",
      control: { type: "text" },
    },
    author_name: {
      description: "Name of the article author",
      control: { type: "text" },
    },
    category: {
      description: "Article category",
      control: { type: "select" },
      options: Object.values(Category),
    },
    region: {
      description: "Article region",
      control: { type: "select" },
      options: Object.values(Region),
    },
    updated_at: {
      description: "When the article was last updated",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for the stories
const mockArticle: ArticleViewWithAuthor = {
  id: 1,
  author_id: 123,
  title: "Uttarakhand Government Launches New Eco-Tourism Initiative in Protected Forest Areas",
  content: "The Uttarakhand government has announced a groundbreaking eco-tourism initiative...",
  category: Category.Environment,
  region: Region.Nainital,
  image: "/images/temple-story.jpg",
  updated_at: "2024-01-15T10:30:00Z",
  rejection_reason: null,
  tags: ["eco-tourism", "forest-conservation", "sustainable-development", "uttarakhand"],
  author_name: "Staff Reporter",
  author_email: "reporter@hillschronicle.com",
  author_profile_photo_url: "/images/avatar.jpg",
  author_about: "Environmental journalist covering Uttarakhand region",
  author_profession: "Senior Reporter",
};

export const Default: Story = {
  name: "Default Article",
  args: mockArticle,
  parameters: {
    docs: {
      description: {
        story: "The default view of a news article header with all standard elements including category/region badges, title, author info, timestamps, and action buttons.",
      },
    },
  },
};

export const MobileView: Story = {
  name: "Mobile View",
  args: mockArticle,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "The article header view optimized for mobile devices, showing how responsive design adapts the layout for smaller screens.",
      },
    },
  },
};

export const TabletView: Story = {
  name: "Tablet View",
  args: mockArticle,
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "The article header view on tablet devices, demonstrating the responsive behavior at medium screen sizes.",
      },
    },
  },
};

export const CultureArticle: Story = {
  name: "Culture Article",
  args: {
    ...mockArticle,
    title: "Ancient Temples of Kedarnath: A Spiritual Journey Through Sacred Architecture",
    category: Category.Culture,
    region: Region.Rudraprayag,
    author_name: "Dr. Meera Joshi",
    author_profession: "Cultural Heritage Expert",
    tags: ["temples", "culture", "kedarnath", "spirituality", "architecture"],
  },
  parameters: {
    docs: {
      description: {
        story: "An example of a culture category article showcasing different content and author information.",
      },
    },
  },
};

export const TourismArticle: Story = {
  name: "Tourism Article",
  args: {
    ...mockArticle,
    title: "Hidden Gems of Kumaon: Offbeat Destinations for Adventure Seekers",
    category: Category.Tourism,
    region: Region.Almora,
    author_name: "Ravi Kumar",
    author_profession: "Travel Writer",
    tags: ["tourism", "adventure", "kumaon", "hidden-gems", "trekking"],
    updated_at: "2024-01-20T14:45:00Z",
  },
  parameters: {
    docs: {
      description: {
        story: "A tourism-focused article with different category and region badges.",
      },
    },
  },
};

export const WithDarkBackground: Story = {
  name: "Dark Background",
  args: mockArticle,
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 min-h-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "The article header component displayed against a dark background to show contrast and readability.",
      },
    },
  },
};

export const LongTitle: Story = {
  name: "Long Title",
  args: {
    ...mockArticle,
    title: "Uttarakhand Government Launches Comprehensive Multi-Phase Eco-Tourism Initiative in Protected Forest Areas Across Multiple Districts to Promote Sustainable Development While Preserving Natural Heritage",
    category: Category.Politics,
    region: Region.Dehradun,
  },
  parameters: {
    docs: {
      description: {
        story: "Article header with a very long title to test text wrapping and layout behavior.",
      },
    },
  },
};
