import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleList from "./article-list";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof ArticleList> = {
  title: "articles/ArticleList",
  component: ArticleList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A responsive article list component that displays articles using ArticleCardRectangleHorizontal components in a grid layout. Features separators between articles (except the last one) and responsive design that adapts from 1 column on mobile to 4 columns on desktop. Perfect for article listings, search results, and category pages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    articles: {
      description: "Array of articles to display in the list format with separators between items.",
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
type Story = StoryObj<typeof ArticleList>;

// Comprehensive mock articles for different scenarios
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Uttarakhand Tourism Board Launches Digital Heritage Trail Initiative",
    image: {
      previewUrl: "/images/temple-story.jpg",
    },
    created_at: "2024-01-15T10:00:00Z",
    region: Region.Dehradun,
    category: Category.Tourism,
    updated_at: "2 hours ago",
    publish_date: "2024-01-15T10:00:00Z",
    status: Status.Approved,
    author_id: 1,
    content: "The state tourism department unveils innovative QR-code enabled heritage trails connecting ancient temples, historical sites, and cultural landmarks across Uttarakhand...",
    rejection_reason: null,
  },
  {
    id: 2,
    title: "Himalayan Research Institute Discovers New Medicinal Plant Species",
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
    content: "Scientists at the high-altitude research facility identify rare flowering plant with potential pharmaceutical applications...",
    rejection_reason: null,
  },
  {
    id: 3,
    title: "Chief Minister Announces ₹500 Crore Rural Development Package",
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
    content: "State government allocates significant funding for infrastructure development in remote hill districts...",
    rejection_reason: null,
  },
  {
    id: 4,
    title: "Traditional Kumaoni Dance Forms Get UNESCO Recognition",
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
    content: "Ancient folk dance traditions of the Kumaon region receive international heritage status...",
    rejection_reason: null,
  },
  {
    id: 5,
    title: "All-Weather Road Connectivity Reaches Last Remote Village",
    image: {
      previewUrl: "/images/author.png",
    },
    created_at: "2024-01-11T09:15:00Z",
    region: Region.Uttarkashi,
    category: Category.Politics,
    updated_at: "3 days ago",
    publish_date: "2024-01-11T09:15:00Z",
    status: Status.Approved,
    author_id: 5,
    content: "Milestone infrastructure project connects final isolated settlement to state highway network...",
    rejection_reason: null,
  },
  {
    id: 6,
    title: "Organic Honey Production Cooperative Reports Record Harvest",
    image: {
      previewUrl: "/images/placeholder.png",
    },
    created_at: "2024-01-10T14:20:00Z",
    region: Region.Nainital,
    category: Category.Economy,
    updated_at: "4 days ago",
    publish_date: "2024-01-10T14:20:00Z",
    status: Status.Approved,
    author_id: 6,
    content: "Local beekeeping initiative achieves highest production levels, boosting rural income...",
    rejection_reason: null,
  },
  {
    id: 7,
    title: "Digital Library Network Connects Mountain Schools",
    image: {
      previewUrl: "/images/temple-story.jpg",
    },
    created_at: "2024-01-09T11:30:00Z",
    region: Region.Bageshwar,
    category: Category.Education,
    updated_at: "5 days ago",
    publish_date: "2024-01-09T11:30:00Z",
    status: Status.Approved,
    author_id: 7,
    content: "High-speed internet infrastructure enables access to educational resources in remote areas...",
    rejection_reason: null,
  },
  {
    id: 8,
    title: "Community Health Centers Introduce Ayurvedic Treatment Units",
    image: {
      previewUrl: "/images/licensed-image.jpg",
    },
    created_at: "2024-01-08T16:45:00Z",
    region: Region.Haridwar,
    category: Category.Health,
    updated_at: "6 days ago",
    publish_date: "2024-01-08T16:45:00Z",
    status: Status.Approved,
    author_id: 8,
    content: "Traditional medicine integration enhances healthcare options in government facilities...",
    rejection_reason: null,
  },
];

export const Default: Story = {
  args: {
    articles: mockArticles,
  },
};

export const SingleArticle: Story = {
  args: {
    articles: [mockArticles[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "List with a single article showing no separator (as it's the last/only item) and how the component handles minimal content.",
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
        story: "List with two articles showing one separator between them, demonstrating the basic separator logic.",
      },
    },
  },
};

export const ThreeArticles: Story = {
  args: {
    articles: mockArticles.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: "List with three articles showing two separators, perfect for testing the separator pattern.",
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
        story: "Four articles filling one row on desktop (lg:grid-cols-4), showing the component at optimal desktop density.",
      },
    },
  },
};

export const ManyArticles: Story = {
  args: {
    articles: [
      ...mockArticles,
      {
        id: 9,
        title: "Border Security Infrastructure Upgrade Completed",
        image: { previewUrl: "/images/download.jpg" },
        created_at: "2024-01-07T13:20:00Z",
        region: Region.Pithoragarh,
        category: Category.Defence,
        updated_at: "1 week ago",
        publish_date: "2024-01-07T13:20:00Z",
        status: Status.Approved,
        author_id: 9,
        content: "Advanced surveillance systems deployed along high-altitude international boundaries...",
        rejection_reason: null,
      },
      {
        id: 10,
        title: "Adventure Tourism Season Opens with Record Bookings",
        image: { previewUrl: "/images/author.png" },
        created_at: "2024-01-06T08:15:00Z",
        region: Region.Uttarkashi,
        category: Category.Tourism,
        updated_at: "1 week ago",
        publish_date: "2024-01-06T08:15:00Z",
        status: Status.Approved,
        author_id: 10,
        content: "Trekking and mountaineering activities see unprecedented demand this season...",
        rejection_reason: null,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Extended list with 10 articles demonstrating how the component handles larger datasets with proper separator distribution.",
      },
    },
  },
};

export const EmptyList: Story = {
  args: {
    articles: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Empty list state showing how the component behaves when no articles are provided.",
      },
    },
  },
};

// Mobile responsive view
export const Mobile: Story = {
  args: {
    articles: mockArticles.slice(0, 5),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view (375px) showing single-column layout where articles stack vertically with separators between each item.",
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
        story: "Tablet view (768px) showing 2-column grid layout with articles arranged in pairs and separators maintaining proper spacing.",
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
        story: "Desktop view (1024px+) showing 4-column grid layout with optimal content density and separator distribution.",
      },
    },
  },
};

// All categories showcase
export const AllCategories: Story = {
  args: {
    articles: [
      { ...mockArticles[0], category: Category.Politics, title: "Government Policy Update on Rural Infrastructure" },
      { ...mockArticles[1], category: Category.Environment, title: "Climate Change Adaptation Program Launched" },
      { ...mockArticles[2], category: Category.Culture, title: "Folk Art Festival Celebrates Regional Heritage" },
      { ...mockArticles[3], category: Category.Tourism, title: "Eco-Tourism Initiative Promotes Sustainable Travel" },
      { ...mockArticles[4], category: Category.Economy, title: "Small Business Growth Program Announced" },
      { ...mockArticles[5], category: Category.Education, title: "Digital Literacy Campaign Reaches Remote Villages" },
      { ...mockArticles[6], category: Category.Health, title: "Mobile Medical Units Serve Mountain Communities" },
      { ...mockArticles[7], category: Category.Defence, title: "Military Training Center Opens in Border Region" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of all 8 news categories with their respective badges distributed across the article list layout.",
      },
    },
  },
};

// Regional content showcase
export const AllRegions: Story = {
  args: {
    articles: [
      { ...mockArticles[0], region: Region.Dehradun, title: "Capital City Development Project Updates" },
      { ...mockArticles[1], region: Region.Haridwar, title: "Industrial Hub Expansion Plans Announced" },
      { ...mockArticles[2], region: Region.Nainital, title: "Lake City Conservation Efforts Intensified" },
      { ...mockArticles[3], region: Region.Almora, title: "Hill Station Tourism Infrastructure Upgrade" },
      { ...mockArticles[4], region: Region.Bageshwar, title: "Remote District Connectivity Project Progress" },
      { ...mockArticles[5], region: Region.Chamoli, title: "High Altitude Research Facility Expansion" },
      { ...mockArticles[6], region: Region.Uttarkashi, title: "Adventure Tourism Hub Development Update" },
      { ...mockArticles[7], region: Region.Pithoragarh, title: "Border District Infrastructure Enhancement" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Regional news coverage showcasing different Uttarakhand districts with proper region badges and local content focus.",
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
        title: "Comprehensive Climate Resilience and Environmental Conservation Initiative Launched Across Multiple Districts",
      },
      {
        ...mockArticles[1],
        title: "Quick News Update",
      },
      {
        ...mockArticles[2],
        title: "Medium Length Headline About Local Development",
      },
      {
        ...mockArticles[3],
        title: "Brief Story",
      },
      {
        ...mockArticles[4],
        title: "Extended Coverage of Regional Infrastructure Development and Community Impact Assessment Program",
      },
      {
        ...mockArticles[5],
        title: "Short Update",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Mixed title lengths testing how the ArticleCardRectangleHorizontal components handle varying content lengths while maintaining layout consistency.",
      },
    },
  },
};

// No images test
export const NoImages: Story = {
  args: {
    articles: mockArticles.slice(0, 6).map(article => ({
      ...article,
      image: { previewUrl: "" }
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "List with all articles having no images, showing placeholder behavior and layout consistency across ArticleCardRectangleHorizontal components.",
      },
    },
  },
};

// Breaking news scenario
export const BreakingNews: Story = {
  args: {
    articles: [
      {
        ...mockArticles[0],
        title: "BREAKING: Major Earthquake Early Warning System Activated",
        category: Category.Politics,
        region: Region.Dehradun,
        updated_at: "LIVE NOW",
      },
      {
        ...mockArticles[1],
        title: "Emergency Response Teams Deployed Statewide",
        category: Category.Politics,
        updated_at: "5 minutes ago",
      },
      {
        ...mockArticles[2],
        title: "Safety Advisory Issued for Hill Districts",
        category: Category.Politics,
        updated_at: "10 minutes ago",
      },
      {
        ...mockArticles[3],
        title: "Transportation Services Temporarily Suspended",
        updated_at: "15 minutes ago",
      },
      {
        ...mockArticles[4],
        title: "Government Issues Official Statement",
        updated_at: "20 minutes ago",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Breaking news scenario with live updates and urgent timestamps, demonstrating how the list handles time-sensitive content.",
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h2>
          <p className="text-gray-600 text-lg mb-4">
            Complete coverage of recent developments across Uttarakhand
          </p>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500">
              Showing {mockArticles.length} articles
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">All</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">Politics</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">Tourism</button>
            </div>
          </div>
          <div className="border-b border-gray-200 mb-8"></div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Article list with section header, article count, and filter buttons showing typical integration within a news listing page.",
      },
    },
  },
};

// Search results context
export const SearchResults: Story = {
  args: {
    articles: mockArticles.slice(0, 5),
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-blue-800 font-medium">Search Results for "tourism development"</span>
            </div>
            <p className="text-blue-600 text-sm mt-1">Found {mockArticles.slice(0, 5).length} articles</p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Article list displayed as search results with search context header showing query and result count.",
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
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>
              <div className="animate-pulse mb-4">
                <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="bg-gray-200 h-16 w-20 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              {i !== 7 && <div className="h-px bg-gray-200 mb-4"></div>}
            </div>
          ))}
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Loading state simulation with skeleton placeholders matching the exact ArticleList structure including separators.",
      },
    },
  },
};

// Separator showcase
export const SeparatorShowcase: Story = {
  args: {
    articles: mockArticles.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Separator Pattern Demonstration</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="text-yellow-800 text-sm space-y-1">
              <p><strong>Separator Logic:</strong></p>
              <p>• Articles 1-3: Each followed by a separator</p>
              <p>• Article 4 (last): No separator after it</p>
              <p>• Separators use: <code className="bg-yellow-100 px-1 rounded">className="mb-4 mt-2"</code></p>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Detailed demonstration of the separator pattern with visual explanation of when separators appear and their styling.",
      },
    },
  },
};

// Performance test
export const PerformanceTest: Story = {
  args: {
    articles: Array.from({ length: 20 }, (_, index) => ({
      ...mockArticles[index % mockArticles.length],
      id: index + 1,
      title: `Article ${index + 1}: ${mockArticles[index % mockArticles.length].title}`,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with 20 articles to ensure smooth rendering and separator handling with larger datasets.",
      },
    },
  },
};
