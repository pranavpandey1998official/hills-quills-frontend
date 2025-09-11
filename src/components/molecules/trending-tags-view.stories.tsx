import type { Meta, StoryObj } from "@storybook/react";
import { TrendingTagsView } from "./trending-tags-view";
    
const meta: Meta<typeof TrendingTagsView> = {
  title: "components/TrendingTagsView",
  component: TrendingTagsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "An animated horizontal scrolling component that displays trending tags. Features a fixed 'Trending:' label with TrendingUp icon on the left, and continuously scrolling clickable tag badges. Includes fallback tags for Uttarakhand-specific topics when no trending tags are provided by the API.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trendingTags: {
      description: "Array of trending tag strings to display. If empty, fallback tags will be shown.",
      control: { type: "object" },
    },
    handleTagClick: {
      description: "Callback function triggered when a tag is clicked. Receives the tag string as parameter.",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TrendingTagsView>;

// Simple mock function for tag clicks
const mockHandleTagClick = (tag: string) => {
  console.log(`Tag clicked: ${tag}`);
};

// Mock trending tags for different scenarios
const currentTrendingTags = [
  "Kedarnath Reopening",
];

const breakingNewsTags = [
  "BREAKING NEWS",
  "Emergency Alert",
  "Weather Warning",
  "Traffic Update",
  "Government Announcement",
  "Public Safety",
  "Road Closure",
  "Evacuation Notice"
];

const seasonalTags = [
  "Winter Tourism",
  "Snow Activities",
  "Skiing Season",
  "Mountain Safety",
  "Cold Weather Tips",
  "Winter Festivals",
  "Hot Springs",
  "Indoor Activities"
];

const culturalTags = [
  "Kumaoni Culture",
  "Folk Music",
  "Traditional Dance",
  "Local Cuisine",
  "Heritage Sites",
  "Art & Crafts",
  "Festivals",
  "Religious Tourism"
];

const environmentTags = [
  "Climate Change",
  "Wildlife Conservation",
  "Forest Protection",
  "Clean Energy",
  "Water Resources",
  "Biodiversity",
  "Pollution Control",
  "Eco-Tourism"
];

const politicalTags = [
  "State Assembly",
  "Policy Changes",
  "Infrastructure",
  "Budget Allocation",
  "Development Plans",
  "Public Welfare",
  "Administrative Updates",
  "Election News"
];

const shortTags = [
  "News",
  "Updates",
  "Live",
  "Hot"
];

const longTags = [
  "Comprehensive Infrastructure Development Initiative",
  "Sustainable Environmental Conservation Program", 
  "Advanced Digital Healthcare Implementation",
  "Revolutionary Education Technology Integration",
  "Cross-Border Cultural Exchange Program"
];

const techTags = [
  "AI Innovation",
  "Smart Cities",
  "Digital India",
  "Tech Startups",
  "Blockchain",
  "IoT Solutions",
  "5G Network",
  "EdTech"
];

export const Default: Story = {
  args: {
    trendingTags: currentTrendingTags,
    handleTagClick: mockHandleTagClick,
  },
};

export const FallbackTags: Story = {
  args: {
    trendingTags: [],
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "When no trending tags are provided, the component displays fallback tags related to Uttarakhand topics like Hill Farming, Char Dham Yatra, and local development.",
      },
    },
  },
};

export const BreakingNews: Story = {
  args: {
    trendingTags: breakingNewsTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Emergency and breaking news tags with urgent topics for immediate attention.",
      },
    },
  },
};

export const Seasonal: Story = {
  args: {
    trendingTags: seasonalTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Winter season-specific trending tags for tourism and activities in Uttarakhand's hill stations.",
      },
    },
  },
};

export const Cultural: Story = {
  args: {
    trendingTags: culturalTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Cultural and heritage-focused trending tags highlighting Uttarakhand's rich traditions.",
      },
    },
  },
};

export const Environment: Story = {
  args: {
    trendingTags: environmentTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Environmental conservation and climate-focused trending tags relevant to the Himalayan region.",
      },
    },
  },
};

export const Political: Story = {
  args: {
    trendingTags: politicalTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Government and administrative trending tags for policy updates and official announcements.",
      },
    },
  },
};

export const ShortTags: Story = {
  args: {
    trendingTags: shortTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Very short tag names showing how the component handles minimal content and faster scrolling.",
      },
    },
  },
};

export const LongTags: Story = {
  args: {
    trendingTags: longTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Extremely long tag names testing text truncation and badge sizing with verbose content.",
      },
    },
  },
};

export const Technology: Story = {
  args: {
    trendingTags: techTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Technology and innovation trending tags for digital transformation news in Uttarakhand.",
      },
    },
  },
};

export const SingleTag: Story = {
  args: {
    trendingTags: ["Major Development Update"],
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Component behavior with only one trending tag, showing how the duplicate system works for continuous scrolling.",
      },
    },
  },
};

// Mobile responsive view
export const Mobile: Story = {
  args: {
    trendingTags: currentTrendingTags,
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing how the trending tags adapt to smaller screens with adjusted spacing and responsive design.",
      },
    },
  },
};

// Tablet responsive view
export const Tablet: Story = {
  args: {
    trendingTags: currentTrendingTags,
    handleTagClick: mockHandleTagClick,
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

// Animation showcase
export const AnimationDemo: Story = {
  args: {
    trendingTags: [
      "Continuously Scrolling Tags",
      "Seamless Loop Animation", 
      "Hover Effects Demo",
      "Click Interaction Test",
      "Responsive Design",
      "Badge Styling",
      "Trending Icon Display"
    ],
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstration of the continuous scrolling animation, hover effects, and interactive features. Tags scroll infinitely from right to left with smooth transitions.",
      },
    },
  },
};

// All categories mixed
export const MixedContent: Story = {
  args: {
    trendingTags: [
      "Breaking News",
      "Kedarnath Temple",
      "Tech Innovation", 
      "Cultural Festival",
      "Wildlife Conservation",
      "Government Policy",
      "Adventure Tourism",
      "Digital Education",
      "Climate Action",
      "Heritage Site",
      "Startup Initiative",
      "Health Alert"
    ],
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Mixed content from various categories showing how different types of trending topics work together in the scrolling interface.",
      },
    },
  },
};

// Performance test with many tags
export const ManyTags: Story = {
  args: {
    trendingTags: [
      "Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6", "Tag 7", "Tag 8", "Tag 9", "Tag 10",
      "Tag 11", "Tag 12", "Tag 13", "Tag 14", "Tag 15", "Tag 16", "Tag 17", "Tag 18", "Tag 19", "Tag 20",
      "Tag 21", "Tag 22", "Tag 23", "Tag 24", "Tag 25", "Tag 26", "Tag 27", "Tag 28", "Tag 29", "Tag 30"
    ],
    handleTagClick: mockHandleTagClick,
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with many tags to ensure smooth scrolling animation and interaction with large datasets.",
      },
    },
  },
};
