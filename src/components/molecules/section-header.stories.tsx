import type { Meta, StoryObj } from "@storybook/react";
import SectionHeader from "./section-header";

const meta: Meta<typeof SectionHeader> = {
  title: "molecules/SectionHeader",
  component: SectionHeader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A section header component that displays a title with consistent styling and bullet decoration. Features responsive typography, proper spacing, and semantic heading structure. Commonly used to introduce content sections throughout the application.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "The section title text to display",
      control: { type: "text" },
    },
  },
  decorators: [
    (Story) => (
        <Story />
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

// Basic Stories
export const Default: Story = {
  args: {
    title: "Latest News",
  },
};

export const TopStories: Story = {
  args: {
    title: "Top Stories",
  },
  parameters: {
    docs: {
      description: {
        story: "Standard section header for featured or top stories sections.",
      },
    },
  },
};

export const Culture: Story = {
  args: {
    title: "Culture & Heritage",
  },
  parameters: {
    docs: {
      description: {
        story: "Section header for cultural content with category-specific styling.",
      },
    },
  },
};

export const Environment: Story = {
  args: {
    title: "Environment & Conservation",
  },
  parameters: {
    docs: {
      description: {
        story: "Environmental content section header demonstrating longer category names.",
      },
    },
  },
};

// Content Length Variations
export const ShortTitle: Story = {
  args: {
    title: "News",
  },
  parameters: {
    docs: {
      description: {
        story: "Very short title to test minimum content layout and bullet alignment.",
      },
    },
  },
};

export const MediumTitle: Story = {
  args: {
    title: "Regional Updates",
  },
  parameters: {
    docs: {
      description: {
        story: "Medium-length title representing typical section header content.",
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    title: "Breaking News and Current Affairs from Uttarakhand",
  },
  parameters: {
    docs: {
      description: {
        story: "Long title testing text wrapping behavior and layout stability with extended content.",
      },
    },
  },
};

export const VeryLongTitle: Story = {
  args: {
    title: "Comprehensive Coverage of Political, Economic, Social, and Environmental Developments Across Uttarakhand Districts",
  },
  parameters: {
    docs: {
      description: {
        story: "Very long title to test extreme content scenarios and responsive text handling.",
      },
    },
  },
};

// Content Type Variations
export const Politics: Story = {
  args: {
    title: "Political Developments",
  },
  parameters: {
    docs: {
      description: {
        story: "Political news section header for government and policy content.",
      },
    },
  },
};

export const Tourism: Story = {
  args: {
    title: "Tourism & Travel",
  },
  parameters: {
    docs: {
      description: {
        story: "Tourism section header for travel guides and destination content.",
      },
    },
  },
};

export const Sports: Story = {
  args: {
    title: "Sports & Recreation",
  },
  parameters: {
    docs: {
      description: {
        story: "Sports content section header for athletic and recreational activities.",
      },
    },
  },
};

export const Health: Story = {
  args: {
    title: "Health & Wellness",
  },
  parameters: {
    docs: {
      description: {
        story: "Health section header for medical and wellness-related content.",
      },
    },
  },
};

export const Economy: Story = {
  args: {
    title: "Economic Updates",
  },
  parameters: {
    docs: {
      description: {
        story: "Economic news section header for business and financial content.",
      },
    },
  },
};

export const Education: Story = {
  args: {
    title: "Education & Research",
  },
  parameters: {
    docs: {
      description: {
        story: "Education section header for academic and research-related content.",
      },
    },
  },
};

// Special Characters and Formatting
export const WithNumbers: Story = {
  args: {
    title: "Top 10 Stories",
  },
  parameters: {
    docs: {
      description: {
        story: "Section header containing numbers to test typography and spacing consistency.",
      },
    },
  },
};

export const WithSymbols: Story = {
  args: {
    title: "Q&A Sessions",
  },
  parameters: {
    docs: {
      description: {
        story: "Section header with special characters and symbols for formatting validation.",
      },
    },
  },
};

export const WithPunctuation: Story = {
  args: {
    title: "Breaking: Emergency Updates!",
  },
  parameters: {
    docs: {
      description: {
        story: "Section header with punctuation marks to test character rendering and spacing.",
      },
    },
  },
};

// Language and Localization
export const HindiContent: Story = {
  args: {
    title: "समाचार और अपडेट",
  },
  parameters: {
    docs: {
      description: {
        story: "Hindi language content to test multilingual support and font rendering.",
      },
    },
  },
};

export const MixedLanguage: Story = {
  args: {
    title: "Uttarakhand समाचार",
  },
  parameters: {
    docs: {
      description: {
        story: "Mixed English and Hindi content testing multilingual typography.",
      },
    },
  },
};

// Responsive Views
export const Mobile: Story = {
  args: {
    title: "Mobile Headlines",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing how section headers adapt to smaller screen sizes.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    title: "Tablet News Section",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view demonstrating medium screen adaptations for section headers.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    title: "Desktop News Overview",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Desktop view showing full-width section header display and spacing.",
      },
    },
  },
};

// Layout Context Examples
export const InArticleGrid: Story = {
  render: () => (
    <div className="space-y-8">
      <SectionHeader title="Featured Articles" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="h-32 bg-gray-200 rounded mb-3"></div>
            <h3 className="font-semibold mb-2">Article Title {item}</h3>
            <p className="text-gray-600 text-sm">Article preview content...</p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Section header shown in context above an article grid layout to demonstrate typical usage.",
      },
    },
  },
};

export const InSidebar: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex-1">
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Main Content Area</span>
        </div>
      </div>
      <div className="w-80 bg-white p-6 rounded-lg shadow-sm border">
        <SectionHeader title="Trending Topics" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="pb-2 border-b border-gray-100 last:border-b-0">
              <h4 className="font-medium text-sm">Trending Topic {item}</h4>
              <p className="text-gray-600 text-xs mt-1">Brief description...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Section header used within a sidebar context showing adaptation to narrower layouts.",
      },
    },
  },
};

export const MultipleHeaders: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <SectionHeader title="Breaking News" />
        <div className="h-24 bg-red-50 rounded border border-red-200 flex items-center justify-center">
          <span className="text-red-600">Breaking news content area</span>
        </div>
      </div>
      <div>
        <SectionHeader title="Regional Updates" />
        <div className="h-24 bg-blue-50 rounded border border-blue-200 flex items-center justify-center">
          <span className="text-blue-600">Regional content area</span>
        </div>
      </div>
      <div>
        <SectionHeader title="Sports & Entertainment" />
        <div className="h-24 bg-green-50 rounded border border-green-200 flex items-center justify-center">
          <span className="text-green-600">Sports content area</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Multiple section headers in sequence showing consistent spacing and visual hierarchy.",
      },
    },
  },
};

// Typography and Styling Focus
export const TypographyShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold mb-4 text-gray-700">Standard Section Header:</h3>
        <SectionHeader title="Typography Example" />
      </div>
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="font-semibold mb-4 text-white">On Dark Background:</h3>
        <div className="text-white">
          <SectionHeader title="Dark Theme Header" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-700">On Gradient Background:</h3>
        <SectionHeader title="Gradient Background" />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Typography showcase demonstrating section header appearance across different background contexts.",
      },
    },
  },
};

// Accessibility and Interaction
export const AccessibilityDemo: Story = {
  args: {
    title: "Accessible Content Section",
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl w-full p-8 bg-gray-50">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">♿ Accessibility Features:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Semantic H2 heading for proper document structure</li>
            <li>• High contrast text for readability</li>
            <li>• Consistent typography hierarchy</li>
            <li>• Screen reader friendly markup</li>
            <li>• Keyboard navigation compatible</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Accessibility demonstration showing semantic HTML structure and screen reader compatibility.",
      },
    },
  },
};

// Edge Cases
export const EmptyTitle: Story = {
  args: {
    title: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Edge case with empty title string to test component resilience and layout behavior.",
      },
    },
  },
};

export const SingleCharacter: Story = {
  args: {
    title: "A",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal content test with single character to verify bullet alignment and spacing.",
      },
    },
  },
};

export const SpecialCharactersOnly: Story = {
  args: {
    title: "🌟 ⭐ 🎯",
  },
  parameters: {
    docs: {
      description: {
        story: "Emoji and special characters testing for unicode support and rendering consistency.",
      },
    },
  },
};
