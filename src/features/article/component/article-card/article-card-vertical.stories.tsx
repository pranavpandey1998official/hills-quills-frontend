import type { Meta, StoryObj } from "@storybook/react";
import ArticleCardVertical from "./article-card-vertical";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleCardVertical> = {
  title: "molecules/ArticleCard/Vertical",
  component: ArticleCardVertical,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A vertical article card component with a full-width image at the top, followed by title and metadata below. Features region badge and timestamp. Perfect for grid layouts, featured articles, and magazine-style presentations.",
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
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleCardVertical>;

const mockArticle: Article = {
  id: 1,
  title: "Sacred Kedarnath Temple Reopens After Winter Break, Pilgrims Flock to Himalayan Shrine",
  image: {
    previewUrl: "/images/temple-story.jpg",
  },
  created_at: "2024-01-15T10:00:00Z",
  region: Region.Rudraprayag,
  category: Category.Tourism,
  updated_at: "3 hours ago",
  publish_date: "2024-01-15T10:00:00Z",
  status: Status.Approved,
  author_id: 1,
  content: "The revered Kedarnath temple has reopened its doors after the winter closure, welcoming thousands of devoted pilgrims...",
  rejection_reason: null,
};

const environmentArticle: Article = {
  ...mockArticle,
  id: 2,
  title: "Himalayan Glaciers Show Signs of Recovery Following Conservation Efforts in Uttarakhand",
  region: Region.Chamoli,
  category: Category.Environment,
  updated_at: "5 hours ago",
  image: {
    previewUrl: "/images/licensed-image.jpg",
  },
};

const cultureArticle: Article = {
  ...mockArticle,
  id: 3,
  title: "Annual Kumaon Folk Festival Celebrates Rich Musical Heritage of Hill Communities",
  region: Region.Almora,
  category: Category.Culture,
  updated_at: "1 day ago",
  image: {
    previewUrl: "/images/licensed-image-2.jpg",
  },
};

const politicsArticle: Article = {
  ...mockArticle,
  id: 4,
  title: "Chief Minister Announces New Infrastructure Development Plan for Remote Hill Districts",
  region: Region.Dehradun,
  category: Category.Politics,
  updated_at: "2 days ago",
  image: {
    previewUrl: "/images/download.jpg",
  },
};

const healthArticle: Article = {
  ...mockArticle,
  id: 5,
  title: "Traditional Ayurvedic Medicine Centers Gain Recognition in International Wellness Tourism",
  region: Region.Haridwar,
  category: Category.Health,
  updated_at: "4 days ago",
};

const economyArticle: Article = {
  ...mockArticle,
  id: 6,
  title: "Organic Farming Initiatives Transform Agricultural Landscape in Uttarakhand Villages",
  region: Region.Nainital,
  category: Category.Economy,
  updated_at: "1 week ago",
};

const longTitleArticle: Article = {
  ...mockArticle,
  id: 7,
  title: "Revolutionary Sustainable Development Project Aims to Transform Rural Communities While Preserving Ancient Cultural Traditions and Natural Heritage Sites Across Multiple Districts",
  region: Region.PauriGarhwal,
  category: Category.Environment,
  updated_at: "2 weeks ago",
};

const shortTitleArticle: Article = {
  ...mockArticle,
  id: 8,
  title: "Valley Blooms",
  region: Region.Champawat,
  category: Category.Tourism,
  updated_at: "3 weeks ago",
};

const educationArticle: Article = {
  ...mockArticle,
  id: 9,
  title: "Digital Learning Centers Bridge Education Gap in Remote Mountain Schools",
  region: Region.Bageshwar,
  category: Category.Education,
  updated_at: "1 month ago",
};

const defenceArticle: Article = {
  ...mockArticle,
  id: 10,
  title: "Advanced Weather Monitoring Systems Installed Along Indo-China Border Areas",
  region: Region.Uttarkashi,
  category: Category.Defence,
  updated_at: "6 weeks ago",
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
        story: "Environmental article showcasing glacier recovery in the Himalayas.",
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
        story: "Cultural article highlighting folk festivals and musical heritage.",
      },
    },
  },
};

export const Politics: Story = {
  args: {
    article: politicsArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Political article about infrastructure development announcements.",
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
        story: "Health category article focusing on Ayurvedic medicine and wellness tourism.",
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
        story: "Economic article about organic farming and agricultural transformation.",
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
        story: "Example with an extremely long title to test text wrapping and layout behavior.",
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
        story: "Example with a very short title showing minimal content layout.",
      },
    },
  },
};

export const Education: Story = {
  args: {
    article: educationArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Education category article about digital learning initiatives.",
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
        story: "Defence category article about border monitoring systems.",
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
        story: "Example showing fallback behavior when article image is missing.",
      },
    },
  },
};

// Grid layout for magazine-style presentation
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <ArticleCardVertical article={mockArticle} />
      <ArticleCardVertical article={environmentArticle} />
      <ArticleCardVertical article={cultureArticle} />
      <ArticleCardVertical article={politicsArticle} />
      <ArticleCardVertical article={healthArticle} />
      <ArticleCardVertical article={economyArticle} />
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Multiple vertical cards in a responsive grid layout, perfect for article galleries and magazine-style layouts.",
      },
    },
  },
};

// Featured articles showcase
export const FeaturedArticles: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCardVertical article={mockArticle} />
          <ArticleCardVertical article={environmentArticle} />
          <ArticleCardVertical article={cultureArticle} />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ArticleCardVertical article={politicsArticle} />
          <ArticleCardVertical article={healthArticle} />
          <ArticleCardVertical article={economyArticle} />
          <ArticleCardVertical article={educationArticle} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Complete news section layout with featured articles and latest news in different grid configurations.",
      },
    },
  },
};

// All regions showcase
export const AllRegions: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">News from All Regions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Almora, title: "Almora District News Update" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Bageshwar, title: "Bageshwar Development Projects" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Chamoli, title: "Chamoli Environmental Updates" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Champawat, title: "Champawat Cultural Events" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Dehradun, title: "Dehradun Administrative News" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Haridwar, title: "Haridwar Spiritual Tourism" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Nainital, title: "Nainital Hill Station Updates" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.PauriGarhwal, title: "Pauri Garhwal Rural News" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Pithoragarh, title: "Pithoragarh Border Updates" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Rudraprayag, title: "Rudraprayag Pilgrimage News" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.TehriGarhwal, title: "Tehri Garhwal Hydro Projects" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.UdhamSinghNagar, title: "Udham Singh Nagar Industry" }} />
        <ArticleCardVertical article={{ ...mockArticle, region: Region.Uttarkashi, title: "Uttarkashi Adventure Tourism" }} />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Showcase of all 13 Uttarakhand regions with their respective region badges and styling.",
      },
    },
  },
};

// Different image aspect ratios
export const ImageVariations: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Portrait Image</h3>
        <ArticleCardVertical article={{ ...mockArticle, image: { previewUrl: "/images/author.png" }, title: "Portrait Style Article" }} />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Landscape Image</h3>
        <ArticleCardVertical article={{ ...mockArticle, image: { previewUrl: "/images/temple-story.jpg" }, title: "Landscape Style Article" }} />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Square Image</h3>
        <ArticleCardVertical article={{ ...mockArticle, image: { previewUrl: "/images/licensed-image.jpg" }, title: "Square Style Article" }} />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Different image aspect ratios to show how the component handles various image dimensions.",
      },
    },
  },
};
