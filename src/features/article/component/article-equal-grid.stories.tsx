import type { Meta, StoryObj } from "@storybook/react";
import ArticleEqualGrid from "./article-equal-grid";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleEqualGrid> = {
  title: "articles/SectionEqualGrid",
  component: ArticleEqualGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A responsive equal-width grid component for displaying articles using ArticleCard components. Features 1 column on mobile, 2 columns on tablet (md), and 3 columns on desktop (lg) with consistent 8px gaps. Each article card displays region and category badges.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    articles: {
      description: "Array of article objects to display in the grid layout.",
      control: { type: "object" },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleEqualGrid>;

// Mock articles for different scenarios
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Sacred Kedarnath Temple Reopens After Winter Break, Thousands of Pilgrims Begin Annual Journey",
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
    content: "The revered Kedarnath temple has reopened its doors after the winter closure, welcoming thousands of devoted pilgrims from across the country...",
    rejection_reason: null,
  },
  {
    id: 2,
    title: "Valley of Flowers Blooms with Rare Himalayan Species After Conservation Efforts",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-14T15:30:00Z",
    region: Region.Chamoli,
    category: Category.Environment,
    updated_at: "6 hours ago",
    publish_date: "2024-01-14T15:30:00Z",
    status: Status.Approved,
    author_id: 2,
    content: "The UNESCO World Heritage site Valley of Flowers showcases unprecedented biodiversity this season...",
    rejection_reason: null,
  },
  {
    id: 3,
    title: "Dehradun Smart City Project Enters Phase 2 with Advanced Digital Infrastructure",
    image: {
      previewUrl: "/images/licensed-image-2.jpg",
    },
    created_at: "2024-01-13T12:00:00Z",
    region: Region.Dehradun,
    category: Category.Politics,
    updated_at: "1 day ago",
    publish_date: "2024-01-13T12:00:00Z",
    status: Status.Approved,
    author_id: 3,
    content: "The state capital's smart city transformation continues with new technological implementations...",
    rejection_reason: null,
  },
  {
    id: 4,
    title: "Traditional Kumaoni Folk Festival Celebrates Rich Cultural Heritage",
    image: {
      previewUrl: "/images/download.jpg",
    },
    created_at: "2024-01-12T18:45:00Z",
    region: Region.Almora,
    category: Category.Culture,
    updated_at: "2 days ago",
    publish_date: "2024-01-12T18:45:00Z",
    status: Status.Approved,
    author_id: 4,
    content: "The annual Kumaoni folk festival brings together artists and performers to celebrate the region's vibrant cultural traditions...",
    rejection_reason: null,
  },
  {
    id: 5,
    title: "Organic Farming Initiative Transforms Agricultural Landscape in Hill Districts",
    image: {
      previewUrl: "/images/author.png",
    },
    created_at: "2024-01-11T09:15:00Z",
    region: Region.Nainital,
    category: Category.Economy,
    updated_at: "3 days ago",
    publish_date: "2024-01-11T09:15:00Z",
    status: Status.Approved,
    author_id: 5,
    content: "Local farmers embrace sustainable farming practices, leading to increased income and environmental benefits...",
    rejection_reason: null,
  },
  {
    id: 6,
    title: "Digital Education Centers Bridge Learning Gap in Remote Mountain Schools",
    image: {
      previewUrl: "/images/placeholder.png",
    },
    created_at: "2024-01-10T14:20:00Z",
    region: Region.Bageshwar,
    category: Category.Education,
    updated_at: "4 days ago",
    publish_date: "2024-01-10T14:20:00Z",
    status: Status.Approved,
    author_id: 6,
    content: "Innovative educational technology reaches remote villages, providing quality learning opportunities...",
    rejection_reason: null,
  },
];

const shortArticles = mockArticles.slice(0, 3);
const manyArticles = [
  ...mockArticles,
  {
    id: 7,
    title: "Healthcare Infrastructure Gets Major Boost with New Medical Colleges",
    image: { previewUrl: "/images/temple-story.jpg" },
    created_at: "2024-01-09T11:30:00Z",
    region: Region.Haridwar,
    category: Category.Health,
    updated_at: "5 days ago",
    publish_date: "2024-01-09T11:30:00Z",
    status: Status.Approved,
    author_id: 7,
    content: "State-of-the-art medical facilities enhance healthcare access across Uttarakhand...",
    rejection_reason: null,
  },
  {
    id: 8,
    title: "Adventure Tourism Season Opens with Record Number of Bookings",
    image: { previewUrl: "/images/licensed-image.jpg" },
    created_at: "2024-01-08T16:45:00Z",
    region: Region.Uttarkashi,
    category: Category.Tourism,
    updated_at: "6 days ago",
    publish_date: "2024-01-08T16:45:00Z",
    status: Status.Approved,
    author_id: 8,
    content: "Trekking and mountaineering activities see unprecedented demand this season...",
    rejection_reason: null,
  },
  {
    id: 9,
    title: "Border Security Enhanced with Advanced Surveillance Technology",
    image: { previewUrl: "/images/download.jpg" },
    created_at: "2024-01-07T08:00:00Z",
    region: Region.Pithoragarh,
    category: Category.Defence,
    updated_at: "1 week ago",
    publish_date: "2024-01-07T08:00:00Z",
    status: Status.Approved,
    author_id: 9,
    content: "Latest defense technologies deployed along high-altitude border areas...",
    rejection_reason: null,
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const ThreeArticles: Story = {
  args: {
    articles: shortArticles,
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with exactly 3 articles, perfect for desktop 3-column layout. Shows how the grid adapts when there's one article per column.",
      },
    },
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with a single article, demonstrating how one article appears in the responsive grid layout across different screen sizes.",
      },
    },
  },
};

export const TwoArticles: Story = {
  args: {
    articles: mockArticles.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with two articles showing how the layout adapts when there are fewer articles than available columns.",
      },
    },
  },
};

export const FourArticles: Story = {
  args: {
    articles: mockArticles.slice(0, 4),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with four articles demonstrating how content flows to a second row in the 3-column desktop layout.",
      },
    },
  },
};

export const FiveArticles: Story = {
  args: {
    articles: mockArticles.slice(0, 5),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with five articles showing an uneven distribution with partial second row.",
      },
    },
  },
};

export const ManyArticles: Story = {
  args: {
    articles: manyArticles,
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with many articles (9 total) demonstrating how the layout handles larger datasets with multiple rows.",
      },
    },
  },
};

export const EmptyGrid: Story = {
  args: {
    articles: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Empty grid state showing how the component behaves when no articles are provided.",
      },
    },
  },
};

// Mobile responsive view
export const Mobile: Story = {
  args: {
    articles: mockArticles,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view (375px) showing single-column layout where all articles stack vertically.",
      },
    },
  },
};

// Tablet responsive view
export const Tablet: Story = {
  args: {
    articles: mockArticles,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view (768px) showing 2-column grid layout with articles arranged in pairs.",
      },
    },
  },
};

// Desktop view
export const Desktop: Story = {
  args: {
    articles: mockArticles,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Desktop view (1024px+) showing full 3-column grid layout with optimal article distribution.",
      },
    },
  },
};

// All categories showcase
export const AllCategories: Story = {
  args: {
    articles: [
      { ...mockArticles[0], category: Category.Politics, title: "State Government Announces New Infrastructure Projects" },
      { ...mockArticles[1], category: Category.Environment, title: "Wildlife Conservation Efforts Show Positive Results" },
      { ...mockArticles[2], category: Category.Culture, title: "Ancient Temples Undergo Digital Documentation" },
      { ...mockArticles[3], category: Category.Tourism, title: "Hill Stations Report Record Tourist Footfall" },
      { ...mockArticles[4], category: Category.Economy, title: "Startup Ecosystem Flourishes in Mountain Towns" },
      { ...mockArticles[5], category: Category.Education, title: "Universities Launch Rural Development Programs" },
      { ...mockArticles[0], id: 10, category: Category.Health, title: "Telemedicine Reaches Remote Villages" },
      { ...mockArticles[1], id: 11, category: Category.Defence, title: "Mountain Warfare Training Centers Established" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of all 8 news categories with their respective badges and styling in the grid layout.",
      },
    },
  },
};

// All regions showcase
export const AllRegions: Story = {
  args: {
    articles: [
      { ...mockArticles[0], region: Region.Almora, title: "Almora District Develops Eco-Tourism Circuit" },
      { ...mockArticles[1], region: Region.Bageshwar, title: "Bageshwar Becomes First Carbon Neutral District" },
      { ...mockArticles[2], region: Region.Chamoli, title: "Chamoli's Biodiversity Conservation Success" },
      { ...mockArticles[3], region: Region.Champawat, title: "Champawat Launches Digital Governance Initiative" },
      { ...mockArticles[4], region: Region.Dehradun, title: "Dehradun Metro Project Enters Final Phase" },
      { ...mockArticles[5], region: Region.Haridwar, title: "Haridwar Industrial Growth Boosts Employment" },
      { ...mockArticles[0], id: 12, region: Region.Nainital, title: "Nainital Lake Restoration Project Complete" },
      { ...mockArticles[1], id: 13, region: Region.PauriGarhwal, title: "Pauri Garhwal Rural Development Milestone" },
      { ...mockArticles[2], id: 14, region: Region.Pithoragarh, title: "Pithoragarh Border Infrastructure Enhanced" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of different Uttarakhand regions with their respective badges and regional news content.",
      },
    },
  },
};

// Mixed content lengths
export const MixedContentLengths: Story = {
  args: {
    articles: [
      {
        ...mockArticles[0],
        title: "Short Title",
      },
      {
        ...mockArticles[1],
        title: "Extremely Long Article Title That Tests How Text Wrapping Works in Grid Cards",
      },
      {
        ...mockArticles[2],
        title: "Medium Length Article Title Testing Typography",
      },
      {
        ...mockArticles[3],
        title: "Another Short One",
      },
      {
        ...mockArticles[4],
        title: "Very Very Very Long Article Title That Could Potentially Cause Layout Issues and Tests Maximum Length Handling",
      },
      {
        ...mockArticles[5],
        title: "Regular Article Title Length",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with articles of varying title lengths to test typography and card height consistency.",
      },
    },
  },
};

// No images showcase
export const NoImages: Story = {
  args: {
    articles: mockArticles.map(article => ({
      ...article,
      image: { previewUrl: "" }
    }))
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with articles that have no images, showing placeholder image behavior and layout consistency.",
      },
    },
  },
};

// Performance test with large dataset
export const PerformanceTest: Story = {
  args: {
    articles: Array.from({ length: 24 }, (_, index) => ({
      ...mockArticles[index % mockArticles.length],
      id: index + 1,
      title: `Article ${index + 1}: ${mockArticles[index % mockArticles.length].title}`,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with 24 articles (8 rows in desktop view) to ensure smooth rendering and scrolling with larger datasets.",
      },
    },
  },
};

// With section header context
export const WithSectionHeader: Story = {
  args: {
    articles: mockArticles,
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Articles</h2>
          <p className="text-gray-600 mb-6">Latest news and updates from across Uttarakhand</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Grid displayed with a section header showing how it typically appears as part of a larger page layout.",
      },
    },
  },
};

// Loading state simulation
export const LoadingState: Story = {
  decorators: [
    () => (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Loading state simulation showing skeleton placeholders with the same grid layout as the actual component.",
      },
    },
  },
};
