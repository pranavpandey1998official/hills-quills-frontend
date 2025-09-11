import type { Meta, StoryObj } from "@storybook/react";
import MainGrid from "../../../app/articles/components/article-main-grid";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof MainGrid> = {
  title: "articles/MainGrid",
  component: MainGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A sophisticated main grid layout component for article displays. Features a prominent main article (2-column span), secondary articles (1 column), and additional articles (1 column) using different card styles. Responsive design adapts from 1 column on mobile to 4 columns on desktop with intelligent article distribution.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    articles: {
      description: "Array of articles where first article becomes the main feature, articles 2-4 are secondary, and remaining articles are displayed as compact cards.",
      control: { type: "object" },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MainGrid>;

// Comprehensive mock articles for different scenarios
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Sacred Kedarnath Temple Reopens After Winter Break: Thousands of Devotees Begin Spiritual Journey to Himalayan Shrine",
    image: {
      previewUrl: "/images/temple-story.jpg",
    },
    created_at: "2024-01-15T10:00:00Z",
    region: Region.Rudraprayag,
    category: Category.Tourism,
    updated_at: "2 hours ago",
    publish_date: "2024-01-15T10:00:00Z",
    status: Status.Approved,
    author_id: 1,
    content: "The revered Kedarnath temple has reopened its doors after the winter closure, welcoming thousands of devoted pilgrims from across the country. The holy shrine, nestled in the Garhwal Himalayas, marks the beginning of the annual Char Dham Yatra season...",
    rejection_reason: null,
  },
  {
    id: 2,
    title: "Valley of Flowers Blooms with Unprecedented Biodiversity",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-14T15:30:00Z",
    region: Region.Chamoli,
    category: Category.Environment,
    updated_at: "5 hours ago",
    publish_date: "2024-01-14T15:30:00Z",
    status: Status.Approved,
    author_id: 2,
    content: "UNESCO World Heritage site showcases over 520 flowering species...",
    rejection_reason: null,
  },
  {
    id: 3,
    title: "Dehradun Smart City Project Enters Advanced Phase",
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
    content: "State capital's digital transformation accelerates with new infrastructure...",
    rejection_reason: null,
  },
  {
    id: 4,
    title: "Kumaoni Folk Festival Celebrates Cultural Heritage",
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
    content: "Traditional artists gather to preserve ancient musical traditions...",
    rejection_reason: null,
  },
  {
    id: 5,
    title: "Organic Farming Revolution in Hill Districts",
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
    content: "Sustainable agriculture practices boost farmer income...",
    rejection_reason: null,
  },
  {
    id: 6,
    title: "Digital Education Centers Transform Rural Learning",
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
    content: "Technology bridges educational gaps in remote areas...",
    rejection_reason: null,
  },
  {
    id: 7,
    title: "Healthcare Infrastructure Gets Major Boost",
    image: {
      previewUrl: "/images/temple-story.jpg",
    },
    created_at: "2024-01-09T11:30:00Z",
    region: Region.Haridwar,
    category: Category.Health,
    updated_at: "5 days ago",
    publish_date: "2024-01-09T11:30:00Z",
    status: Status.Approved,
    author_id: 7,
    content: "New medical colleges enhance healthcare access...",
    rejection_reason: null,
  },
  {
    id: 8,
    title: "Adventure Tourism Season Opens Strong",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-08T16:45:00Z",
    region: Region.Uttarkashi,
    category: Category.Tourism,
    updated_at: "6 days ago",
    publish_date: "2024-01-08T16:45:00Z",
    status: Status.Approved,
    author_id: 8,
    content: "Record bookings for trekking and mountaineering...",
    rejection_reason: null,
  },
  {
    id: 9,
    title: "Adventure Tourism Season Opens Strong",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-08T16:45:00Z",
    region: Region.Uttarkashi,
    category: Category.Tourism,
    updated_at: "6 days ago",
    publish_date: "2024-01-08T16:45:00Z",
    status: Status.Approved,
    author_id: 8,
    content: "Record bookings for trekking and mountaineering...",
    rejection_reason: null,
  },
  {
    id: 10,
    title: "Adventure Tourism Season Opens Strong",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-08T16:45:00Z",
    region: Region.Uttarkashi,
    category: Category.Tourism,
    updated_at: "6 days ago",
    publish_date: "2024-01-08T16:45:00Z",
    status: Status.Approved,
    author_id: 8,
    content: "Record bookings for trekking and mountaineering...",
    rejection_reason: null,
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const MinimalContent: Story = {
  args: {
    articles: mockArticles.slice(0, 1),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with only the main article (first article), showing how the layout adapts when secondary and additional articles are not available.",
      },
    },
  },
};

export const MainPlusSecondary: Story = {
  args: {
    articles: mockArticles.slice(0, 4),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with main article plus 3 secondary articles (4 total), showing the core layout without additional compact cards.",
      },
    },
  },
};

export const MainPlusOne: Story = {
  args: {
    articles: mockArticles.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with main article plus one secondary article, testing minimal content distribution.",
      },
    },
  },
};

export const MainPlusTwo: Story = {
  args: {
    articles: mockArticles.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with main article plus two secondary articles, showing partial secondary column fill.",
      },
    },
  },
};

export const FullGrid: Story = {
  args: {
    articles: mockArticles,
  },
  parameters: {
    docs: {
      description: {
        story: "Complete grid with main article, 3 secondary articles, and 4 additional compact articles demonstrating full layout potential.",
      },
    },
  },
};

export const ManyAdditionalArticles: Story = {
  args: {
    articles: [
      ...mockArticles,
      {
        id: 9,
        title: "Border Security Enhanced with New Technology",
        image: { previewUrl: "/images/download.jpg" },
        created_at: "2024-01-07T08:00:00Z",
        region: Region.Pithoragarh,
        category: Category.Defence,
        updated_at: "1 week ago",
        publish_date: "2024-01-07T08:00:00Z",
        status: Status.Approved,
        author_id: 9,
        content: "Advanced surveillance systems deployed along high-altitude borders...",
        rejection_reason: null,
      },
      {
        id: 10,
        title: "Yoga Tourism Attracts International Visitors",
        image: { previewUrl: "/images/author.png" },
        created_at: "2024-01-06T13:20:00Z",
        region: Region.Haridwar,
        category: Category.Tourism,
        updated_at: "1 week ago",
        publish_date: "2024-01-06T13:20:00Z",
        status: Status.Approved,
        author_id: 10,
        content: "Spiritual capital sees surge in wellness tourists...",
        rejection_reason: null,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with many additional articles (6 total in the compact column) showing how the layout handles extensive content in the rightmost column.",
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
        story: "Mobile view (375px) showing single-column layout where all articles stack vertically with the main article maintaining prominence.",
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
        story: "Tablet view (768px) showing 2-column layout adaptation with main article spanning both columns and other articles below.",
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
        story: "Desktop view (1024px+) showing full 4-column grid with main article (2 cols), secondary articles (1 col), and compact articles (1 col).",
      },
    },
  },
};

// Content variety showcase
export const AllCategories: Story = {
  args: {
    articles: [
      { ...mockArticles[0], category: Category.Politics, title: "State Assembly Announces Development Budget" },
      { ...mockArticles[1], category: Category.Environment, title: "Wildlife Sanctuary Expansion Program" },
      { ...mockArticles[2], category: Category.Culture, title: "Traditional Arts Festival Begins" },
      { ...mockArticles[3], category: Category.Tourism, title: "Hill Station Tourism Records Peak" },
      { ...mockArticles[4], category: Category.Economy, title: "Tech Startups Flourish in Mountains" },
      { ...mockArticles[5], category: Category.Education, title: "University Launches Online Programs" },
      { ...mockArticles[6], category: Category.Health, title: "Rural Health Centers Modernized" },
      { ...mockArticles[7], category: Category.Defence, title: "Military Training Academy Opens" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of all 8 news categories distributed across the main grid layout, demonstrating category badge variety.",
      },
    },
  },
};

// Regional content showcase
export const AllRegions: Story = {
  args: {
    articles: [
      { ...mockArticles[0], region: Region.Almora, title: "Almora District Development Initiative" },
      { ...mockArticles[1], region: Region.Bageshwar, title: "Bageshwar Eco-Tourism Project" },
      { ...mockArticles[2], region: Region.Chamoli, title: "Chamoli Biodiversity Conservation" },
      { ...mockArticles[3], region: Region.Champawat, title: "Champawat Digital Governance" },
      { ...mockArticles[4], region: Region.Dehradun, title: "Dehradun Metro Progress Update" },
      { ...mockArticles[5], region: Region.Haridwar, title: "Haridwar Industrial Growth" },
      { ...mockArticles[6], region: Region.Nainital, title: "Nainital Lake Restoration" },
      { ...mockArticles[7], region: Region.Uttarkashi, title: "Uttarkashi Adventure Hub" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Regional news distribution across the main grid showing different Uttarakhand districts and their respective region badges.",
      },
    },
  },
};

// Mixed article lengths
export const MixedTitleLengths: Story = {
  args: {
    articles: [
      {
        ...mockArticles[0],
        title: "Major Breakthrough in Himalayan Climate Research Reveals Unprecedented Glacial Patterns",
      },
      {
        ...mockArticles[1],
        title: "Short Update",
      },
      {
        ...mockArticles[2],
        title: "Medium Length Article About Local Development",
      },
      {
        ...mockArticles[3],
        title: "Brief News",
      },
      {
        ...mockArticles[4],
        title: "Compact Story",
      },
      {
        ...mockArticles[5],
        title: "Quick Update",
      },
      {
        ...mockArticles[6],
        title: "Fast News",
      },
      {
        ...mockArticles[7],
        title: "Brief Report",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Mixed title lengths testing how the grid layout handles varying content lengths in different card types.",
      },
    },
  },
};

// No images test
export const NoImages: Story = {
  args: {
    articles: mockArticles.map(article => ({
      ...article,
      image: { previewUrl: "" }
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with all articles having no images, showing placeholder behavior across different card types.",
      },
    },
  },
};

// Breaking news layout
export const BreakingNews: Story = {
  args: {
    articles: [
      {
        ...mockArticles[0],
        title: "BREAKING: Historic Agreement Signed for Cross-Border Infrastructure Development",
        category: Category.Politics,
        region: Region.Dehradun,
        updated_at: "LIVE",
      },
      {
        ...mockArticles[1],
        title: "Emergency Response Teams Deploy Across Affected Areas",
        category: Category.Politics,
        updated_at: "30 minutes ago",
      },
      {
        ...mockArticles[2],
        title: "Government Issues Official Statement",
        category: Category.Politics,
        updated_at: "1 hour ago",
      },
      {
        ...mockArticles[3],
        title: "Local Officials Coordinate Relief Efforts",
        category: Category.Politics,
        updated_at: "2 hours ago",
      },
      {
        ...mockArticles[4],
        title: "Traffic Updates",
        updated_at: "Live",
      },
      {
        ...mockArticles[5],
        title: "Weather Alert",
        updated_at: "30 min ago",
      },
      {
        ...mockArticles[6],
        title: "Safety Notice",
        updated_at: "1 hr ago",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Breaking news scenario with urgent updates and live timestamps, showing how the grid handles time-sensitive content.",
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest News</h1>
          <p className="text-gray-600 text-lg mb-6">
            Stay updated with the most important stories from across Uttarakhand
          </p>
          <div className="border-b border-gray-200 mb-8"></div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Grid displayed with section header showing typical homepage or section page integration with proper spacing and typography hierarchy.",
      },
    },
  },
};

// Loading state simulation
export const LoadingState: Story = {
  decorators: [
    () => (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Main article skeleton */}
          <div className="col-span-2">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-64 w-full rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
          
          {/* Secondary articles skeleton */}
          <div className="col-span-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="animate-pulse mb-6">
                <div className="bg-gray-200 h-32 w-full rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
          
          {/* Compact articles skeleton */}
          <div className="col-span-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="animate-pulse mb-4 flex gap-3">
                <div className="bg-gray-200 h-16 w-20 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Loading state simulation with skeleton placeholders matching the exact grid structure and proportions of the actual component.",
      },
    },
  },
};
