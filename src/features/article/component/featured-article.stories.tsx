import type { Meta, StoryObj } from "@storybook/react";
import { FeaturedArticle } from "@/features/article/component/featured-article";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof FeaturedArticle> = {
  title: "articles/FeaturedArticle",
  component: FeaturedArticle,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A large hero-style featured article component with full-width background image, gradient overlays, hover effects, and responsive design. Perfect for showcasing the most important news story on the homepage or section landing pages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    article: {
      description: "Article object containing title, image, region, date, and other metadata for the featured story.",
      control: { type: "object" },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeaturedArticle>;

const heroArticle: Article = {
  id: 1,
  title: "Sacred Valley of Flowers Blooms Again: Uttarakhand's Hidden Paradise Welcomes Visitors After Conservation Success",
  image: {
    previewUrl: "/images/temple-story.jpg",
  },
  created_at: "2024-01-15T10:00:00Z",
  region: Region.Chamoli,
  category: Category.Environment,
  updated_at: "2 hours ago",
  publish_date: "2024-01-15T10:00:00Z",
  status: Status.Approved,
  author_id: 1,
  content: "The UNESCO World Heritage site Valley of Flowers has reopened its gates to nature enthusiasts and trekkers after a successful three-year conservation program. The pristine alpine meadow, located in Chamoli district, is now home to over 520 species of flowering plants, creating a spectacular carpet of colors across the Himalayan landscape. This remarkable recovery represents one of Uttarakhand's most successful environmental conservation stories...",
  rejection_reason: null,
};

const breakingNewsArticle: Article = {
  ...heroArticle,
  id: 2,
  title: "BREAKING: Historic Agreement Signed Between India and Nepal for Cross-Border Pilgrimage Development in Uttarakhand",
  region: Region.Pithoragarh,
  category: Category.Politics,
  created_at: "2024-01-16T08:30:00Z",
  image: {
    previewUrl: "/images/licensed-image.jpg",
  },
};

const cultureArticle: Article = {
  ...heroArticle,
  id: 3,
  title: "Ancient Char Dham Yatra Embraces Digital Age: QR Codes and AI Guides Transform Spiritual Journey",
  region: Region.Rudraprayag,
  category: Category.Culture,
  created_at: "2024-01-14T15:20:00Z",
  image: {
    previewUrl: "/images/licensed-image-2.jpg",
  },
};

const economyArticle: Article = {
  ...heroArticle,
  id: 4,
  title: "Uttarakhand Emerges as India's Leading Adventure Tourism Destination: ₹5000 Crore Industry Milestone Achieved",
  region: Region.Dehradun,
  category: Category.Economy,
  created_at: "2024-01-13T12:00:00Z",
  image: {
    previewUrl: "/images/download.jpg",
  },
};

const healthArticle: Article = {
  ...heroArticle,
  id: 5,
  title: "Revolutionary Telemedicine Network Connects Remote Himalayan Villages to World-Class Healthcare",
  region: Region.Uttarkashi,
  category: Category.Health,
  created_at: "2024-01-12T09:45:00Z",
};

const educationArticle: Article = {
  ...heroArticle,
  id: 6,
  title: "Digital Gurukulas: How Ancient Learning Traditions Meet Modern Technology in Uttarakhand Schools",
  region: Region.Haridwar,
  category: Category.Education,
  created_at: "2024-01-11T14:15:00Z",
};

const defenceArticle: Article = {
  ...heroArticle,
  id: 7,
  title: "Advanced Early Warning Systems Installed Across Himalayan Border: Protecting Communities from Natural Disasters",
  region: Region.Chamoli,
  category: Category.Defence,
  created_at: "2024-01-10T11:30:00Z",
};

const tourismArticle: Article = {
  ...heroArticle,
  id: 8,
  title: "Sustainable Eco-Tourism Model Transforms Local Communities: Villages Become Guardians of Himalayan Wildlife",
  region: Region.Nainital,
  category: Category.Tourism,
  created_at: "2024-01-09T16:20:00Z",
};

const longTitleArticle: Article = {
  ...heroArticle,
  id: 9,
  title: "Unprecedented Climate Resilience Initiative Launched Across Uttarakhand: Multi-Billion Dollar International Collaboration Aims to Create World's Most Advanced Mountain Ecosystem Protection and Community Development Program",
  region: Region.PauriGarhwal,
  category: Category.Environment,
  created_at: "2024-01-08T13:10:00Z",
};

const shortTitleArticle: Article = {
  ...heroArticle,
  id: 10,
  title: "Himalayan Snow Leopard Spotted",
  region: Region.Bageshwar,
  category: Category.Environment,
  created_at: "2024-01-07T10:00:00Z",
};

export const BreakingNews: Story = {
  args: {
    article: breakingNewsArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Breaking news article with political category, showcasing urgent and important news coverage.",
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
        story: "Cultural article highlighting the intersection of tradition and technology in spiritual practices.",
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
        story: "Economic success story showcasing tourism industry achievements and financial milestones.",
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
        story: "Healthcare innovation article demonstrating technology's impact on remote medical services.",
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
        story: "Educational transformation story blending ancient learning with modern digital tools.",
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
        story: "Defence and disaster preparedness article focusing on community protection systems.",
      },
    },
  },
};

export const Tourism: Story = {
  args: {
    article: tourismArticle,
  },
  parameters: {
    docs: {
      description: {
        story: "Sustainable tourism article highlighting community-based conservation efforts.",
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
        story: "Example with an extremely long title to test text wrapping and responsive typography at different screen sizes.",
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
        story: "Example with a very short title showing minimal content and how the component adapts to brief headlines.",
      },
    },
  },
};

export const NoImage: Story = {
  args: {
    article: {
      ...heroArticle,
      image: {
        previewUrl: "",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Fallback behavior when the featured article image is missing, showing placeholder handling.",
      },
    },
  },
};

// Mobile responsive view
export const Mobile: Story = {
  args: {
    article: heroArticle,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing how the component adapts to smaller screens with adjusted typography and spacing.",
      },
    },
  },
};

// Tablet responsive view
export const Tablet: Story = {
  args: {
    article: heroArticle,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view demonstrating the component's responsive behavior on medium-sized screens.",
      },
    },
  },
};

// Desktop large view
export const Desktop: Story = {
  args: {
    article: heroArticle,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Full desktop view showcasing the component at its largest size with maximum visual impact.",
      },
    },
  },
};

// Different regions showcase
export const AllRegions: Story = {
  render: () => (
    <div className="space-y-8">
      <FeaturedArticle article={{ ...heroArticle, region: Region.Almora, title: "Almora's Ancient Temples Get Digital Conservation Treatment" }} />
      <FeaturedArticle article={{ ...heroArticle, region: Region.Bageshwar, title: "Bageshwar Becomes Model Eco-District with Zero-Waste Initiative" }} />
      <FeaturedArticle article={{ ...heroArticle, region: Region.Chamoli, title: "Chamoli's Flower Valleys Bloom with Unprecedented Biodiversity" }} />
      <FeaturedArticle article={{ ...heroArticle, region: Region.Champawat, title: "Champawat's Organic Farming Revolution Spreads Across Hills" }} />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Multiple featured articles showcasing different regions and how the component works in a series or rotating hero section.",
      },
    },
  },
};

