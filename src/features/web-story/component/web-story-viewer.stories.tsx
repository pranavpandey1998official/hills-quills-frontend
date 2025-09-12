import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WebStoryViewer } from "./web-story-viewer";
import { StoryView } from "@/features/web-story/types";
import { Category, Region } from "@/types/common";

const meta: Meta<typeof WebStoryViewer> = {
  title: "web-story/WebStoryViewer",
  component: WebStoryViewer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "An interactive web story viewer component that displays stories in a full-screen modal format with slide navigation, auto-advance, progress bars, and touch/keyboard controls. Features pause/play functionality, sharing capabilities, and responsive design for optimal viewing across devices.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    story: {
      description: "Story object containing slides, cover image, and metadata",
      control: { type: "object" },
    },
    onClose: {
      description: "Callback function triggered when user closes the story viewer",
      control: { type: "object" },
    },
  },
  decorators: [
    (Story) => (
      <div className="fixed inset-0 z-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WebStoryViewer>;

// Mock console function for onClose callback
const mockOnClose = () => {
  console.log("Story viewer closed");
};

// Comprehensive story data for different testing scenarios
const kedarnathStory: StoryView = {
  id: 1,
  title: "Sacred Temples of Kedarnath: A Spiritual Journey Through the Himalayas",
  author_id: 1,
  cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  region: Region.Rudraprayag,
  category: Category.Culture,
  rejection_reason: null,
  updated_at: "2024-01-15T10:00:00Z",
  tags: ["Temples", "Spirituality", "Himalayas", "Pilgrimage", "Kedarnath"],
  slides: [
    {
      id: 1,
      slide_order: 1,
      web_story_id: 1,
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      caption: "The majestic Kedarnath temple stands tall against the Himalayan backdrop, one of the holiest shrines in Hindu pilgrimage",
      duration: 5,
    },
    {
      id: 2,
      slide_order: 2,
      web_story_id: 1,
      image_url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800",
      caption: "Pilgrims journey through challenging mountain paths to reach this sacred shrine, facing extreme weather and difficult terrain",
      duration: 6,
    },
    {
      id: 3,
      slide_order: 3,
      web_story_id: 1,
      image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      caption: "Ancient architecture showcases the rich spiritual heritage of Uttarakhand and centuries of devotion",
      duration: 5,
    },
    {
      id: 4,
      slide_order: 4,
      web_story_id: 1,
      image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      caption: "The temple complex offers breathtaking views of snow-capped peaks and pristine mountain landscapes",
      duration: 7,
    },
  ],
};

const wildlifeStory: StoryView = {
  id: 2,
  title: "Wildlife Wonders: Jim Corbett National Park's Magnificent Biodiversity",
  author_id: 2,
  cover_image_url: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=400",
  region: Region.Nainital,
  category: Category.Environment,
  rejection_reason: null,
  updated_at: "2024-01-14T15:30:00Z",
  tags: ["Wildlife", "Tigers", "Conservation", "Nature", "Jim Corbett"],
  slides: [
    {
      id: 5,
      slide_order: 1,
      web_story_id: 2,
      image_url: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800",
      caption: "Royal Bengal tigers roam freely in their natural habitat, showcasing the success of conservation efforts",
      duration: 6,
    },
    {
      id: 6,
      slide_order: 2,
      web_story_id: 2,
      image_url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800",
      caption: "Asian elephants move gracefully through dense forest corridors, maintaining ancient migration routes",
      duration: 5,
    },
    {
      id: 7,
      slide_order: 3,
      web_story_id: 2,
      image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      caption: "Diverse ecosystems support hundreds of bird and mammal species in this protected sanctuary",
      duration: 5,
    },
  ],
};

const singleSlideStory: StoryView = {
  id: 3,
  title: "Mountain Vista: A Single Moment",
  author_id: 3,
  cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  region: Region.Chamoli,
  category: Category.Tourism,
  rejection_reason: null,
  updated_at: "2024-01-13T12:00:00Z",
  tags: ["Mountains", "Vista", "Landscape"],
  slides: [
    {
      id: 8,
      slide_order: 1,
      web_story_id: 3,
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      caption: "A breathtaking mountain vista that captures the essence of Uttarakhand's natural beauty",
      duration: 8,
    },
  ],
};

const longCaptionStory: StoryView = {
  id: 4,
  title: "Detailed Journey Through Uttarakhand",
  author_id: 4,
  cover_image_url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=400",
  region: Region.Uttarkashi,
  category: Category.Culture,
  rejection_reason: null,
  updated_at: "2024-01-12T09:30:00Z",
  tags: ["Culture", "Heritage", "Detailed"],
  slides: [
    {
      id: 9,
      slide_order: 1,
      web_story_id: 4,
      image_url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800",
      caption: "This is an example of a very long caption that demonstrates how the story viewer handles extensive text content. It should wrap appropriately and remain readable while maintaining the visual appeal of the story interface. The text overlay should provide sufficient contrast against the background image.",
      duration: 10,
    },
    {
      id: 10,
      slide_order: 2,
      web_story_id: 4,
      image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      caption: "Short caption example",
      duration: 4,
    },
  ],
};

const shortDurationStory: StoryView = {
  id: 5,
  title: "Quick Glimpses",
  author_id: 5,
  cover_image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
  region: Region.Almora,
  category: Category.Tourism,
  rejection_reason: null,
  updated_at: "2024-01-11T16:45:00Z",
  tags: ["Quick", "Tourism", "Snapshots"],
  slides: [
    {
      id: 11,
      slide_order: 1,
      web_story_id: 5,
      image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      caption: "First quick view",
      duration: 3,
    },
    {
      id: 12,
      slide_order: 2,
      web_story_id: 5,
      image_url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800",
      caption: "Second quick view",
      duration: 3,
    },
    {
      id: 13,
      slide_order: 3,
      web_story_id: 5,
      image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      caption: "Third quick view",
      duration: 3,
    },
  ],
};

const manySlideStory: StoryView = {
  id: 6,
  title: "Complete Uttarakhand Adventure",
  author_id: 6,
  cover_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
  region: Region.Haridwar,
  category: Category.Tourism,
  rejection_reason: null,
  updated_at: "2024-01-10T14:20:00Z",
  tags: ["Adventure", "Complete", "Tourism", "Comprehensive"],
  slides: [
    {
      id: 14,
      slide_order: 1,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      caption: "Starting our journey through the sacred mountains",
      duration: 5,
    },
    {
      id: 15,
      slide_order: 2,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800",
      caption: "Exploring ancient temple architecture",
      duration: 5,
    },
    {
      id: 16,
      slide_order: 3,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800",
      caption: "Encountering magnificent wildlife",
      duration: 6,
    },
    {
      id: 17,
      slide_order: 4,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800",
      caption: "Discovering diverse forest ecosystems",
      duration: 5,
    },
    {
      id: 18,
      slide_order: 5,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      caption: "Experiencing pristine natural landscapes",
      duration: 6,
    },
    {
      id: 19,
      slide_order: 6,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      caption: "Traditional mountain communities and culture",
      duration: 5,
    },
    {
      id: 20,
      slide_order: 7,
      web_story_id: 6,
      image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      caption: "Breathtaking panoramic mountain views",
      duration: 7,
    },
  ],
};

// Basic Stories
export const KedarnathTemple: Story = {
  args: {
    story: kedarnathStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Multi-slide story showcasing Kedarnath temple with spiritual content and pilgrimage journey. Features 4 slides with varying durations (5-7 seconds).",
      },
    },
  },
};

export const WildlifeConservation: Story = {
  args: {
    story: wildlifeStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Wildlife conservation story from Jim Corbett National Park featuring tigers, elephants, and forest ecosystems. Demonstrates 3-slide format with consistent 5-6 second timing.",
      },
    },
  },
};

export const SingleSlide: Story = {
  args: {
    story: singleSlideStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Single-slide story to test minimal content handling and extended duration (8 seconds). Tests progress bar with single segment.",
      },
    },
  },
};

// Content Variation Stories
export const LongCaptions: Story = {
  args: {
    story: longCaptionStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Tests text wrapping and readability with very long caption content alongside normal-length captions. Extended duration (10 seconds) for reading time.",
      },
    },
  },
};

export const QuickSlides: Story = {
  args: {
    story: shortDurationStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Fast-paced story with 3-second slide durations to test rapid navigation and progress bar animation speed.",
      },
    },
  },
};

export const ExtendedStory: Story = {
  args: {
    story: manySlideStory,
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Comprehensive 7-slide story testing navigation with many slides, progress bar with multiple segments, and story cycling behavior.",
      },
    },
  },
};

// Mobile and Responsive Views
export const Mobile: Story = {
  args: {
    story: kedarnathStory,
    onClose: mockOnClose,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing touch navigation areas, mobile-specific tap zones, and responsive layout adjustments for smaller screens.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    story: wildlifeStory,
    onClose: mockOnClose,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view demonstrating medium screen adaptations and touch interaction areas for story navigation.",
      },
    },
  },
};

// Interactive Testing Stories
export const NavigationTest: Story = {
  args: {
    story: kedarnathStory,
    onClose: mockOnClose,
  },
  decorators: [
    (Story) => (
      <div className="fixed inset-0 z-50">
        <div className="absolute top-4 left-4 z-[60] bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
          <h3 className="font-semibold text-blue-900 mb-2">🎮 Navigation Controls:</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• <strong>Left Arrow:</strong> Previous slide</li>
            <li>• <strong>Right Arrow:</strong> Next slide</li>
            <li>• <strong>Spacebar:</strong> Pause/Play</li>
            <li>• <strong>Click Left:</strong> Previous slide</li>
            <li>• <strong>Click Right:</strong> Next slide</li>
            <li>• <strong>Click Center:</strong> Pause/Play (mobile)</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Interactive testing story with visible controls guide. Test keyboard navigation (arrow keys, spacebar) and click/tap navigation areas.",
      },
    },
  },
};

export const PausePlayDemo: Story = {
  args: {
    story: wildlifeStory,
    onClose: mockOnClose,
  },
  decorators: [
    (Story) => (
      <div className="fixed inset-0 z-50">
        <div className="absolute top-4 right-4 z-[60] bg-green-50 border border-green-200 rounded-lg p-4 max-w-xs">
          <h3 className="font-semibold text-green-900 mb-2">⏯️ Pause/Play Features:</h3>
          <ul className="text-green-800 space-y-1 text-sm">
            <li>• Click pause button in header</li>
            <li>• Press spacebar to toggle</li>
            <li>• Tap center area (mobile)</li>
            <li>• Click overlay when paused</li>
            <li>• Progress bars stop/resume</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Pause/play functionality demonstration with overlay behavior, progress bar control, and multiple interaction methods.",
      },
    },
  },
};

export const ProgressBarShowcase: Story = {
  args: {
    story: manySlideStory,
    onClose: mockOnClose,
  },
  decorators: [
    (Story) => (
      <div className="fixed inset-0 z-50">
        <div className="absolute bottom-4 left-4 z-[60] bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md">
          <h3 className="font-semibold text-purple-900 mb-2">📊 Progress Bar Features:</h3>
          <ul className="text-purple-800 space-y-1 text-sm">
            <li>• Multiple segments for each slide</li>
            <li>• Smooth animation and timing</li>
            <li>• Visual feedback for current position</li>
            <li>• Completed slides show full progress</li>
            <li>• Upcoming slides remain empty</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Progress bar visualization with 7 slides showing segment behavior, timing animation, and visual progression indicators.",
      },
    },
  },
};

// Edge Cases and Error States
export const NoOnClose: Story = {
  args: {
    story: singleSlideStory,
    // onClose intentionally omitted
  },
  parameters: {
    docs: {
      description: {
        story: "Tests component behavior when onClose callback is not provided. Close button should still be functional.",
      },
    },
  },
};

export const EmptyCaption: Story = {
  args: {
    story: {
      ...singleSlideStory,
      slides: [
        {
          ...singleSlideStory.slides[0],
          caption: "",
        },
      ],
    },
    onClose: mockOnClose,
  },
  parameters: {
    docs: {
      description: {
        story: "Tests handling of empty caption content and layout behavior with missing text.",
      },
    },
  },
};

// All Categories Showcase
export const AllCategories: Story = {
  render: () => (
    <div className="fixed inset-0 z-50">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[60] bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="text-center text-gray-700 text-sm">
          <strong>Category Showcase:</strong> Use navigation to see different content types
        </div>
      </div>
      <WebStoryViewer 
        story={{
          ...kedarnathStory,
          slides: [
            { ...kedarnathStory.slides[0], caption: "Culture: Sacred temple heritage" },
            { ...wildlifeStory.slides[0], caption: "Environment: Wildlife conservation" },
            { ...singleSlideStory.slides[0], caption: "Tourism: Mountain adventures" },
          ]
        }}
        onClose={mockOnClose}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of different content categories (Culture, Environment, Tourism) in a single story experience.",
      },
    },
  },
};

// Interaction Guide Story
export const InteractionGuide: Story = {
  args: {
    story: kedarnathStory,
    onClose: mockOnClose,
  },
  decorators: [
    (Story) => (
      <div className="fixed inset-0 z-50">
        <div className="absolute top-8 left-8 right-8 z-[60] bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="font-bold text-yellow-900 mb-4">🎯 Complete Interaction Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">⌨️ Keyboard:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• Left Arrow: Previous</li>
                <li>• Right Arrow: Next</li>
                <li>• Spacebar: Pause/Play</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">🖱️ Desktop:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• Click left area: Previous</li>
                <li>• Click right area: Next</li>
                <li>• Header buttons: Controls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">📱 Mobile:</h3>
              <ul className="text-yellow-700 space-y-1">
                <li>• Tap left: Previous</li>
                <li>• Tap right: Next</li>
                <li>• Tap center: Pause/Play</li>
              </ul>
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
        story: "Comprehensive interaction guide showing all available controls and navigation methods across different devices and input types.",
      },
    },
  },
};
