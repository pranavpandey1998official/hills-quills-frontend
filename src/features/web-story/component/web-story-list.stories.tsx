import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import WebStoryList from "@/features/web-story/component/web-story-list";
import { Story as WebStoryType } from "@/features/web-story/types";
import { Category, Region, Status, ImageFile } from "@/types/common";

// Define proper props interface for the component
interface WebStoryListProps {
  stories: WebStoryType[];
  onStoryClick?: (story: WebStoryType) => void;
}

const meta: Meta<WebStoryListProps> = {
  title: "web-story/WebStoryList",
  component: WebStoryList as any, // Type assertion due to component signature issue
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A horizontal scrolling list of web stories with hover effects and click interactions. Displays story cover images, titles, categories, and regions in a responsive card format. Features smooth scrolling, image transformations on hover, and clickable story navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    stories: {
      description: "Array of story objects to display in the horizontal list",
      control: { type: "object" },
    },
    onStoryClick: {
      description: "Callback function triggered when a story card is clicked",
      control: { type: "object" },
    },
  },
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
};

export default meta;
type Story = StoryObj<WebStoryListProps>;

// Mock console function for onStoryClick callback
const mockOnStoryClick = (story: WebStoryType) => {
  console.log("Story clicked:", story.title);
};

// Comprehensive mock story data
const templeStory: WebStoryType = {
  id: 1,
  title: "Sacred Temples of Kedarnath: A Spiritual Journey Through the Himalayas",
  author_id: 1,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" } as ImageFile,
  region: Region.Rudraprayag,
  category: Category.Culture,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-15T09:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
};

const wildlifeStory: WebStoryType = {
  id: 2,
  title: "Wildlife Wonders: Jim Corbett National Park",
  author_id: 2,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400" } as ImageFile,
  region: Region.Nainital,
  category: Category.Environment,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-14T14:30:00Z",
  updated_at: "2024-01-14T15:30:00Z",
};

const cultureStory: WebStoryType = {
  id: 3,
  title: "Traditional Kumaoni Crafts",
  author_id: 3,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400" } as ImageFile,
  region: Region.Almora,
  category: Category.Culture,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-13T11:00:00Z",
  updated_at: "2024-01-13T12:00:00Z",
};

const adventureStory: WebStoryType = {
  id: 4,
  title: "Mountain Trekking Adventures in Garhwal",
  author_id: 4,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" } as ImageFile,
  region: Region.Uttarkashi,
  category: Category.Tourism,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-12T17:45:00Z",
  updated_at: "2024-01-12T18:45:00Z",
};

const foodStory: WebStoryType = {
  id: 5,
  title: "Flavors of the Hills: Kumaoni Cuisine",
  author_id: 5,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" } as ImageFile,
  region: Region.Nainital,
  category: Category.Culture,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-11T08:15:00Z",
  updated_at: "2024-01-11T09:15:00Z",
};

const shortTitleStory: WebStoryType = {
  id: 6,
  title: "Hill Festival",
  author_id: 6,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400" } as ImageFile,
  region: Region.Chamoli,
  category: Category.Culture,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-10T13:20:00Z",
  updated_at: "2024-01-10T14:20:00Z",
};

const longTitleStory: WebStoryType = {
  id: 7,
  title: "The Complete Guide to Uttarakhand's Most Beautiful and Sacred Temple Sites: A Comprehensive Journey Through Ancient Architecture and Spiritual Heritage",
  author_id: 7,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400" } as ImageFile,
  region: Region.Haridwar,
  category: Category.Culture,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-09T10:30:00Z",
  updated_at: "2024-01-09T11:30:00Z",
};

const economyStory: WebStoryType = {
  id: 8,
  title: "Economic Development in Hill Districts",
  author_id: 8,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400" } as ImageFile,
  region: Region.Dehradun,
  category: Category.Economy,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-08T15:45:00Z",
  updated_at: "2024-01-08T16:45:00Z",
};

const healthStory: WebStoryType = {
  id: 9,
  title: "Healthcare Initiatives in Remote Areas",
  author_id: 9,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400" } as ImageFile,
  region: Region.Pithoragarh,
  category: Category.Health,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-07T09:15:00Z",
  updated_at: "2024-01-07T10:15:00Z",
};

const educationStory: WebStoryType = {
  id: 10,
  title: "Education Revolution in Mountain Schools",
  author_id: 10,
  cover_image_url: { previewUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400" } as ImageFile,
  region: Region.Bageshwar,
  category: Category.Education,
  status: Status.Approved,
  rejection_reason: null,
  created_at: "2024-01-06T12:25:00Z",
  updated_at: "2024-01-06T13:25:00Z",
};

// Basic Stories
export const Default: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory, adventureStory, foodStory],
    onStoryClick: mockOnStoryClick,
  },
};

export const SingleStory: Story = {
  args: {
    stories: [templeStory],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Single story display to test minimal content and layout behavior without scrolling.",
      },
    },
  },
};

export const TwoStories: Story = {
  args: {
    stories: [templeStory, wildlifeStory],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Two stories showing basic horizontal layout without requiring scroll interaction.",
      },
    },
  },
};

export const ManyStories: Story = {
  args: {
    stories: [
      templeStory,
      wildlifeStory,
      cultureStory,
      adventureStory,
      foodStory,
      shortTitleStory,
      longTitleStory,
      economyStory,
      healthStory,
      educationStory,
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Extended story collection (10 stories) to test horizontal scrolling behavior and performance with larger datasets.",
      },
    },
  },
};

// Content Variation Stories
export const ShortTitles: Story = {
  args: {
    stories: [
      { ...templeStory, title: "Temples" },
      { ...wildlifeStory, title: "Wildlife" },
      { ...cultureStory, title: "Crafts" },
      { ...adventureStory, title: "Trekking" },
      { ...foodStory, title: "Food" },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Short title variations to test minimal text content and layout consistency.",
      },
    },
  },
};

export const LongTitles: Story = {
  args: {
    stories: [
      {
        ...templeStory,
        title: "Sacred Temples of Kedarnath: A Complete Spiritual Journey Through the Majestic Himalayas and Ancient Religious Sites",
      },
      {
        ...wildlifeStory,
        title: "Wildlife Conservation Efforts in Jim Corbett National Park: Protecting Tigers and Preserving Biodiversity",
      },
      {
        ...cultureStory,
        title: "Traditional Kumaoni Handicrafts and Artisan Techniques: Preserving Cultural Heritage Through Generations",
      },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Long title content testing text wrapping behavior and line-clamp functionality (2 lines max).",
      },
    },
  },
};

// Category-based Stories
export const CultureStories: Story = {
  args: {
    stories: [
      templeStory,
      cultureStory,
      foodStory,
      { ...shortTitleStory, category: Category.Culture },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Cultural content showcase featuring temples, crafts, cuisine, and festivals from Uttarakhand.",
      },
    },
  },
};

export const EnvironmentStories: Story = {
  args: {
    stories: [
      wildlifeStory,
      { ...adventureStory, category: Category.Environment, title: "Eco-Tourism in Mountains" },
      { ...templeStory, category: Category.Environment, title: "Forest Conservation" },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Environmental content including wildlife conservation, eco-tourism, and forest protection initiatives.",
      },
    },
  },
};

export const TourismStories: Story = {
  args: {
    stories: [
      adventureStory,
      { ...templeStory, category: Category.Tourism, title: "Pilgrimage Tourism" },
      { ...wildlifeStory, category: Category.Tourism, title: "Wildlife Safari" },
      { ...foodStory, category: Category.Tourism, title: "Culinary Tourism" },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Tourism-focused stories covering adventure, pilgrimage, wildlife, and culinary experiences.",
      },
    },
  },
};

// Regional Showcase
export const AllRegions: Story = {
  args: {
    stories: [
      { ...templeStory, region: Region.Rudraprayag },
      { ...wildlifeStory, region: Region.Nainital },
      { ...cultureStory, region: Region.Almora },
      { ...adventureStory, region: Region.Uttarkashi },
      { ...foodStory, region: Region.Chamoli },
      { ...economyStory, region: Region.Dehradun },
      { ...healthStory, region: Region.Pithoragarh },
      { ...educationStory, region: Region.Bageshwar },
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Regional diversity showcase featuring stories from different Uttarakhand districts.",
      },
    },
  },
};

// Empty State
export const EmptyState: Story = {
  args: {
    stories: [],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state showing component behavior when no stories are provided.",
      },
    },
  },
};

// Responsive Views
export const Mobile: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory, adventureStory, foodStory],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing touch-friendly scrolling and responsive card sizing for smaller screens.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory, adventureStory, foodStory, shortTitleStory],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view demonstrating medium screen layout and horizontal scrolling behavior.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    stories: [
      templeStory,
      wildlifeStory,
      cultureStory,
      adventureStory,
      foodStory,
      shortTitleStory,
      longTitleStory,
    ],
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Desktop view showing full-width layout with multiple visible story cards and smooth scrolling.",
      },
    },
  },
};

// Interaction Testing
export const ClickInteraction: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory],
    onStoryClick: mockOnStoryClick,
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl w-full p-8 bg-gray-50">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">🖱️ Click Interaction Testing:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Click any story card to see console output</li>
            <li>• Each click logs the story title and details</li>
            <li>• Test cursor pointer behavior on hover</li>
            <li>• Verify click event propagation</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Interactive Web Stories
          </h2>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Interactive testing story with console logging to verify click event handling and callback functionality.",
      },
    },
  },
};

export const HoverEffects: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory, adventureStory],
    onStoryClick: mockOnStoryClick,
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl w-full p-8 bg-gray-50">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-900 mb-2">✨ Hover Effects Testing:</h3>
          <ul className="text-green-800 space-y-1 text-sm">
            <li>• Hover over story cards to see image transformations</li>
            <li>• Image scales up by 5% (scale-105)</li>
            <li>• Brightness increases by 10% (brightness-110)</li>
            <li>• Saturation increases by 25% (saturate-125)</li>
            <li>• Smooth 500ms transition duration</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Hover Effect Demo
          </h2>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Hover effects demonstration showing image transformations, scaling, and visual feedback on story card interaction.",
      },
    },
  },
};

// Scrolling Behavior
export const ScrollingDemo: Story = {
  args: {
    stories: Array.from({ length: 15 }, (_, i) => ({
      ...templeStory,
      id: i + 1,
      title: `Story ${i + 1}: ${templeStory.title}`,
      cover_image_url: { previewUrl: `https://images.unsplash.com/photo-${1506905925346 + i}?w=400` } as ImageFile,
    })),
    onStoryClick: mockOnStoryClick,
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl w-full p-8 bg-gray-50">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2">📜 Scrolling Behavior:</h3>
          <ul className="text-purple-800 space-y-1 text-sm">
            <li>• 15 stories for extended horizontal scrolling</li>
            <li>• Hidden scrollbar for clean appearance</li>
            <li>• Smooth scrolling with mouse wheel</li>
            <li>• Touch-friendly swipe on mobile devices</li>
            <li>• Flex-shrink-0 prevents card compression</li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Extended Story Collection
          </h2>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Extended collection with 15 stories to demonstrate horizontal scrolling, hidden scrollbar, and touch navigation.",
      },
    },
  },
};

// Layout Context
export const InPageContext: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hills & Quills</h1>
        <p className="text-gray-600">Latest stories from Uttarakhand</p>
      </header>
      
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Featured Web Stories
          </h2>
        </div>
        <WebStoryList stories={[templeStory, wildlifeStory, cultureStory, adventureStory, foodStory]} onStoryClick={mockOnStoryClick} />
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 section-heading">
            <span className="section-bullet"></span>
            Cultural Stories
          </h2>
        </div>
        <WebStoryList stories={[templeStory, cultureStory, foodStory, shortTitleStory]} onStoryClick={mockOnStoryClick} />
      </section>

      <footer className="border-t pt-8 mt-16">
        <p className="text-center text-gray-500">© 2024 Hills & Quills. All rights reserved.</p>
      </footer>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Full page context showing multiple WebStoryList components integrated into a complete article page layout.",
      },
    },
  },
};

// Performance Testing
export const PerformanceTest: Story = {
  args: {
    stories: Array.from({ length: 50 }, (_, i) => ({
      ...templeStory,
      id: i + 1,
      title: `Performance Test Story ${i + 1}`,
      cover_image_url: { previewUrl: `https://images.unsplash.com/photo-${1506905925346 + (i % 10)}?w=400` } as ImageFile,
    })),
    onStoryClick: mockOnStoryClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Performance testing with 50 stories to evaluate rendering speed, scrolling smoothness, and memory usage.",
      },
    },
  },
};

// No Callback Function
export const NoCallback: Story = {
  args: {
    stories: [templeStory, wildlifeStory, cultureStory],
    // onStoryClick intentionally omitted
  },
  parameters: {
    docs: {
      description: {
        story: "Testing component behavior when onStoryClick callback is not provided.",
      },
    },
  },
};
