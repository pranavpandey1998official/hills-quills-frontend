import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SecondaryGrid from "@/features/article/component/article-secondary-grid";
import { Article } from "@/features/article/types";
import { Category, Region, Status } from "@/types/common";

const meta: Meta<typeof SecondaryGrid> = {
  title: "articles/SecondaryGrid",
  component: SecondaryGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A sophisticated secondary grid layout component featuring asymmetric article distribution. Left section contains a main article (2-column span) with two secondary articles below it. Right section displays additional articles as compact horizontal cards. Responsive design adapts from single column on mobile to two-column layout on tablet and desktop.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    articles: {
      description: "Array of articles where the first article becomes the main feature (2-col span), articles 2-3 are secondary (1 col each), and articles 4+ are displayed as compact horizontal cards.",
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
type Story = StoryObj<typeof SecondaryGrid>;

// Comprehensive mock articles for testing
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Revolutionary Digital Governance Initiative Transforms Rural Administration in Uttarakhand",
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
    content: "The state government launches comprehensive e-governance platform connecting remote villages with digital services, marking a significant milestone in rural development and administrative efficiency...",
    rejection_reason: null,
  },
  {
    id: 2,
    title: "Himalayan Wildlife Sanctuary Expands Conservation Efforts",
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
    content: "New protected areas established to safeguard endangered species in the high-altitude regions...",
    rejection_reason: null,
  },
  {
    id: 3,
    title: "Traditional Garhwali Arts Festival Celebrates Cultural Heritage",
    image: {
      previewUrl: "/images/licensed-image-2.jpg",
    },
    created_at: "2024-01-13T12:00:00Z",
    region: Region.PauriGarhwal,
    category: Category.Culture,
    updated_at: "1 day ago",
    publish_date: "2024-01-13T12:00:00Z",
    status: Status.Approved,
    author_id: 3,
    content: "Annual festival brings together master artisans and performers to showcase the rich cultural traditions of the Garhwal region...",
    rejection_reason: null,
  },
  {
    id: 4,
    title: "Medical College Opens in Bageshwar District",
    image: {
      previewUrl: "/images/download.jpg",
    },
    created_at: "2024-01-12T18:45:00Z",
    region: Region.Bageshwar,
    category: Category.Health,
    updated_at: "2 days ago",
    publish_date: "2024-01-12T18:45:00Z",
    status: Status.Approved,
    author_id: 4,
    content: "State-of-the-art medical facility enhances healthcare infrastructure in hill regions...",
    rejection_reason: null,
  },
  {
    id: 5,
    title: "Sustainable Tourism Initiative Boosts Local Economy",
    image: {
      previewUrl: "/images/author.png",
    },
    created_at: "2024-01-11T09:15:00Z",
    region: Region.Nainital,
    category: Category.Tourism,
    updated_at: "3 days ago",
    publish_date: "2024-01-11T09:15:00Z",
    status: Status.Approved,
    author_id: 5,
    content: "Community-based tourism programs create employment while preserving natural beauty...",
    rejection_reason: null,
  },
  {
    id: 6,
    title: "Tech Startups Flourish in Hill Station Ecosystem",
    image: {
      previewUrl: "/images/placeholder.png",
    },
    created_at: "2024-01-10T14:20:00Z",
    region: Region.Almora,
    category: Category.Economy,
    updated_at: "4 days ago",
    publish_date: "2024-01-10T14:20:00Z",
    status: Status.Approved,
    author_id: 6,
    content: "Digital entrepreneurs leverage mountain serenity for innovative business solutions...",
    rejection_reason: null,
  },
  {
    id: 7,
    title: "Rural Education Gets Digital Transformation",
    image: {
      previewUrl: "/images/temple-story.jpg",
    },
    created_at: "2024-01-09T11:30:00Z",
    region: Region.Uttarkashi,
    category: Category.Education,
    updated_at: "5 days ago",
    publish_date: "2024-01-09T11:30:00Z",
    status: Status.Approved,
    author_id: 7,
    content: "Smart classrooms and high-speed internet reach remote mountain schools...",
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
    articles: [mockArticles[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with only the main article, showing how the layout adapts when secondary and additional articles are not available.",
      },
    },
  },
};

export const MainPlusSecondary: Story = {
  args: {
    articles: mockArticles.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: "Complete left section with main article and two secondary articles (3 total), showing the core grid structure without compact articles.",
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
        story: "Main article with one secondary article, testing partial secondary section fill.",
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
        story: "Complete grid with main article, two secondary articles, and four compact articles demonstrating full layout capacity.",
      },
    },
  },
};

export const ManyCompactArticles: Story = {
  args: {
    articles: [
      ...mockArticles,
      {
        id: 8,
        title: "Border Infrastructure Development Accelerates",
        image: { previewUrl: "/images/licensed-image.jpg" },
        created_at: "2024-01-08T16:45:00Z",
        region: Region.Pithoragarh,
        category: Category.Defence,
        updated_at: "6 days ago",
        publish_date: "2024-01-08T16:45:00Z",
        status: Status.Approved,
        author_id: 8,
        content: "Strategic infrastructure projects enhance security along high-altitude borders...",
        rejection_reason: null,
      },
      {
        id: 9,
        title: "Organic Certification Program Supports Farmers",
        image: { previewUrl: "/images/download.jpg" },
        created_at: "2024-01-07T13:20:00Z",
        region: Region.Haridwar,
        category: Category.Economy,
        updated_at: "1 week ago",
        publish_date: "2024-01-07T13:20:00Z",
        status: Status.Approved,
        author_id: 9,
        content: "Agricultural certification scheme boosts market value for organic produce...",
        rejection_reason: null,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Grid with extended compact articles section (6 total compact articles) showing how the right column handles larger content volumes.",
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
        story: "Mobile view (375px) showing single-column layout where all sections stack vertically with proper spacing.",
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
        story: "Tablet view (768px) showing full two-column layout with nested grid structure properly distributed.",
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
        story: "Desktop view (1024px+) displaying optimal layout with clear visual hierarchy and content separation.",
      },
    },
  },
};

// Content variety showcase
export const AllCategories: Story = {
  args: {
    articles: [
      { ...mockArticles[0], category: Category.Politics, title: "Legislative Assembly Passes Key Infrastructure Bill" },
      { ...mockArticles[1], category: Category.Environment, title: "Forest Conservation Program Expands Statewide" },
      { ...mockArticles[2], category: Category.Culture, title: "UNESCO Recognition for Traditional Architecture" },
      { ...mockArticles[3], category: Category.Health, title: "Telemedicine Network Connects Rural Clinics" },
      { ...mockArticles[4], category: Category.Tourism, title: "Adventure Sports Hub Development Announced" },
      { ...mockArticles[5], category: Category.Economy, title: "Small Business Growth Initiative Launched" },
      { ...mockArticles[6], category: Category.Education, title: "Skill Development Centers Open in Remote Areas" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of all 7 major news categories distributed across the secondary grid layout, demonstrating category badge variety.",
      },
    },
  },
};

// Regional content showcase
export const AllRegions: Story = {
  args: {
    articles: [
      { ...mockArticles[0], region: Region.Dehradun, title: "Capital City Smart Infrastructure Project" },
      { ...mockArticles[1], region: Region.Haridwar, title: "Industrial Growth Corridor Development" },
      { ...mockArticles[2], region: Region.Nainital, title: "Lake City Tourism Renaissance Program" },
      { ...mockArticles[3], region: Region.Almora, title: "Hill Town Cultural Heritage Initiative" },
      { ...mockArticles[4], region: Region.Bageshwar, title: "Remote District Connectivity Project" },
      { ...mockArticles[5], region: Region.Chamoli, title: "High Altitude Research Center Opens" },
      { ...mockArticles[6], region: Region.Uttarkashi, title: "Adventure Tourism Hub Expansion" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Regional news distribution showcasing different Uttarakhand districts with their respective region badges and local content focus.",
      },
    },
  },
};

// Mixed content lengths
export const MixedTitleLengths: Story = {
  args: {
    articles: [
      {
        ...mockArticles[0],
        title: "Comprehensive Climate Change Adaptation Strategy Launched Across Multiple Districts with International Collaboration",
      },
      {
        ...mockArticles[1],
        title: "Quick Update",
      },
      {
        ...mockArticles[2],
        title: "Medium Length Article About Development",
      },
      {
        ...mockArticles[3],
        title: "Brief News Flash",
      },
      {
        ...mockArticles[4],
        title: "Short Story",
      },
      {
        ...mockArticles[5],
        title: "Fast Update",
      },
      {
        ...mockArticles[6],
        title: "News Brief",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Mixed title lengths testing how the different card types handle varying content lengths and maintain layout consistency.",
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
        story: "Grid with all articles having no images, showing placeholder behavior across both ArticleCard and ArticleCardRectangleHorizontal components.",
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
        title: "BREAKING: Major Infrastructure Agreement Signed with Central Government",
        category: Category.Politics,
        region: Region.Dehradun,
        updated_at: "LIVE NOW",
      },
      {
        ...mockArticles[1],
        title: "Emergency Response Teams Mobilized",
        category: Category.Politics,
        updated_at: "15 minutes ago",
      },
      {
        ...mockArticles[2],
        title: "Traffic Diversions in Effect",
        category: Category.Politics,
        updated_at: "30 minutes ago",
      },
      {
        ...mockArticles[3],
        title: "Latest Updates",
        updated_at: "LIVE",
      },
      {
        ...mockArticles[4],
        title: "Official Statement",
        updated_at: "45 min ago",
      },
      {
        ...mockArticles[5],
        title: "Weather Alert",
        updated_at: "1 hr ago",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Breaking news layout with live updates and urgent timestamps, showing how the grid handles time-sensitive breaking news content.",
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Stories</h2>
          <p className="text-gray-600 text-lg mb-6">
            Curated selection of important news and developments from across Uttarakhand
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
        story: "Grid displayed with section header showing typical integration within a larger page layout with proper typography hierarchy.",
      },
    },
  },
};

// Empty grid state
export const EmptyGrid: Story = {
  args: {
    articles: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Empty grid state showing how the component handles when no articles are provided.",
      },
    },
  },
};

// Loading state simulation
export const LoadingState: Story = {
  decorators: [
    () => (
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section skeleton */}
          <div className="col-span-1 grid md:grid-cols-2 gap-4">
            {/* Main article skeleton */}
            <div className="col-span-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
            
            {/* Secondary articles skeleton */}
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
          
          {/* Right section skeleton */}
          <div className="col-span-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="animate-pulse mb-4 flex gap-3">
                <div className="bg-gray-200 h-16 w-20 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
        story: "Loading state simulation with skeleton placeholders matching the exact secondary grid structure and component proportions.",
      },
    },
  },
};

// Performance test
export const PerformanceTest: Story = {
  args: {
    articles: Array.from({ length: 15 }, (_, index) => ({
      ...mockArticles[index % mockArticles.length],
      id: index + 1,
      title: `Article ${index + 1}: ${mockArticles[index % mockArticles.length].title}`,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with 15 articles (12 in compact section) to ensure smooth rendering with larger datasets.",
      },
    },
  },
};

// Layout comparison with other grids
export const LayoutShowcase: Story = {
  args: {
    articles: mockArticles,
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">SecondaryGrid Layout Structure</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="text-blue-900 text-sm space-y-2">
              <p><strong>Left Section (col-span-1):</strong> Nested 2-column grid</p>
              <p className="ml-4">• Main Article: spans 2 columns (full width)</p>
              <p className="ml-4">• Secondary Articles: 1 column each (articles 2-3)</p>
              <p><strong>Right Section (col-span-1):</strong> Compact articles stack</p>
              <p className="ml-4">• Compact Cards: vertical stack (articles 4+)</p>
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
        story: "Detailed layout structure explanation with visual guide showing how the SecondaryGrid organizes content across its asymmetric sections.",
      },
    },
  },
};
