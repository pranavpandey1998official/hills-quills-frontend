import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Main navigation header component featuring the Hills & Quills branding, responsive navigation menu, region selector, and search functionality. Includes hover animations, mobile-responsive design, and integrated search interface. Provides consistent site-wide navigation and brand identity.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // No props for this component - it manages its own state
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Basic Stories
export const Default: Story = {};

export const WithPageContent: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Article Title {item}</h3>
                <p className="text-gray-600 text-sm">
                  Sample article content showing how the header appears in context with page content below it.
                </p>
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
        story: "Header shown in context with page content to demonstrate typical usage and layout integration.",
      },
    },
  },
};

// Responsive Views
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing navigation collapse, hidden region selector, and mobile-optimized layout.",
      },
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet view demonstrating medium screen adaptations and navigation layout changes.",
      },
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Desktop view showing full navigation menu, region selector, and complete header functionality.",
      },
    },
  },
};

// Navigation Focus
export const NavigationShowcase: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">🧭 Navigation Features:</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• <strong>Home:</strong> Main landing page with latest content</li>
              <li>• <strong>Top News:</strong> Breaking news and featured articles</li>
              <li>• <strong>Culture:</strong> Cultural heritage and traditions</li>
              <li>• <strong>Vibes:</strong> Web stories and multimedia content</li>
              <li>• <strong>Hover Effects:</strong> Orange underline animations on navigation links</li>
              <li>• <strong>Mobile Menu:</strong> Navigation hidden on small screens ( 768px)</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Navigation demonstration highlighting menu structure, link organization, and hover animations.",
      },
    },
  },
};

// Search Functionality
export const SearchDemo: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">🔍 Search Functionality:</h3>
            <ul className="text-green-800 space-y-2 text-sm">
              <li>• Click the search icon in the header to open the search interface</li>
              <li>• Inline search overlay provides real-time article searching</li>
              <li>• Search state managed with React useState hook</li>
              <li>• Press ESC or click outside to close search overlay</li>
              <li>• Fully responsive search interface across all devices</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Search functionality demonstration with instructions for testing the inline search feature.",
      },
    },
  },
};

// Branding Focus
export const BrandingShowcase: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-orange-900 mb-3">🎨 Brand Identity:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Logo Design:</h4>
                <ul className="text-orange-700 space-y-1">
                  <li>• "Hills" in teal-600 (#0891b2)</li>
                  <li>• "Quills" in orange-500 (#f97316)</li>
                  <li>• Bold typography for impact</li>
                  <li>• Linked to homepage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">Visual Elements:</h4>
                <ul className="text-orange-700 space-y-1">
                  <li>• "Mountain Chronicles" tagline</li>
                  <li>• Clean white background</li>
                  <li>• Subtle gray-200 bottom border</li>
                  <li>• Consistent spacing and alignment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Brand identity showcase highlighting logo design, color scheme, and visual hierarchy.",
      },
    },
  },
};

// Interactive Elements
export const InteractiveDemo: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">⚡ Interactive Elements:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Hover Effects:</h4>
                <ul className="text-purple-700 space-y-1">
                  <li>• Navigation links with orange underline animation</li>
                  <li>• 300ms transition duration for smoothness</li>
                  <li>• Underline expands from center to full width</li>
                  <li>• Consistent hover state across all nav items</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Button Actions:</h4>
                <ul className="text-purple-700 space-y-1">
                  <li>• Region selector with dropdown indicator</li>
                  <li>• Search button opens inline search overlay</li>
                  <li>• Ghost button styling for clean appearance</li>
                  <li>• Responsive button visibility (region hidden on mobile)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Interactive elements demonstration showing hover animations, button behaviors, and state changes.",
      },
    },
  },
};

// Different Background Contexts
export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-3">🌙 Dark Background Context</h3>
            <p className="text-gray-300 text-sm">
              Header maintains its white background and styling even when placed over dark page backgrounds,
              ensuring consistent branding and readability across all page contexts.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Header shown on dark background to demonstrate contrast and visual separation from page content.",
      },
    },
  },
};

export const OnColoredBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">🎨 Colored Background Context</h3>
            <p className="text-gray-700 text-sm">
              Header maintains visual prominence and readability against colorful or gradient backgrounds
              through its solid white background and subtle border separation.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Header displayed over colorful gradient background to test visual separation and brand consistency.",
      },
    },
  },
};

// Layout Integration
export const WithSidebar: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="flex max-w-7xl mx-auto">
          <main className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Main Content Area</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <h3 className="font-semibold mb-2">Content Block {item}</h3>
                  <p className="text-gray-600 text-sm">Sample content area...</p>
                </div>
              ))}
            </div>
          </main>
          <aside className="w-80 p-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="font-semibold text-gray-900 mb-4">Sidebar Content</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <h4 className="font-medium text-sm">Sidebar Item {item}</h4>
                    <p className="text-gray-600 text-xs mt-1">Brief description...</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Header integrated with sidebar layout showing compatibility with complex page structures.",
      },
    },
  },
};

// Mobile Menu Testing
export const MobileMenuBehavior: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">📱 Mobile Navigation:</h3>
            <ul className="text-yellow-800 space-y-1 text-sm">
              <li>• Navigation menu hidden on screens  768px (md breakpoint)</li>
              <li>• Region selector button hidden on screens  640px (sm breakpoint)</li>
              <li>• Logo and search button remain visible on all screen sizes</li>
              <li>• Consider implementing mobile hamburger menu for navigation</li>
            </ul>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <h2 className="font-semibold mb-4">Mobile Content Example</h2>
            <p className="text-gray-600 text-sm mb-4">
              This demonstrates how content appears below the header on mobile devices.
              The navigation menu is hidden to save space, with only essential elements visible.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Mobile Card {item}</h3>
                  <p className="text-gray-600 text-sm mt-1">Mobile-optimized content layout</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile-specific behavior testing showing navigation collapse and responsive element visibility.",
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityDemo: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">♿ Accessibility Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Semantic HTML:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Proper <code>&lt;header&gt;</code> landmark</li>
                  <li>• Semantic <code>&lt;nav&gt;</code> navigation</li>
                  <li>• Descriptive link text</li>
                  <li>• Logical heading hierarchy</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Keyboard Navigation:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Tab-accessible navigation links</li>
                  <li>• Focus visible indicators</li>
                  <li>• Keyboard-operable search button</li>
                  <li>• Logical tab order</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Accessibility demonstration highlighting semantic HTML structure, keyboard navigation, and screen reader compatibility.",
      },
    },
  },
};

// Performance Consideration
export const PerformanceDemo: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-white">
        <Story />
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">⚡ Performance Considerations:</h3>
            <ul className="text-green-800 space-y-2 text-sm">
              <li>• <strong>State Management:</strong> Minimal React state for search toggle</li>
              <li>• <strong>CSS Animations:</strong> Hardware-accelerated transforms for smooth hover effects</li>
              <li>• <strong>Code Splitting:</strong> InlineSearch component loaded conditionally</li>
              <li>• <strong>Image Optimization:</strong> No heavy images in header for fast loading</li>
              <li>• <strong>Responsive Design:</strong> CSS-only responsive behavior (no JavaScript)</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Performance optimization showcase highlighting efficient state management and rendering strategies.",
      },
    },
  },
};
