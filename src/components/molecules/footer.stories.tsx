import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";

const meta: Meta<typeof Footer> = {
  title: "components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A comprehensive footer component for the HillsQuills news website. Features the brand logo, navigation categories, Uttarakhand districts, contact information, and social media links. Includes responsive grid layout and hover effects throughout.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sample Page Content</h1>
            <div className="space-y-4 text-gray-600">
              <p>This is sample page content to show the footer in context. The footer appears at the bottom of the page with a clear separation from the main content.</p>
              <p>HillsQuills is Uttarakhand's premier news source, providing comprehensive coverage of local news, culture, politics, and development across all 13 districts.</p>
              <p>Our mission is to keep the people of Uttarakhand informed about the latest happenings in their beautiful hill state, from the plains of Haridwar to the peaks of Uttarkashi.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Local Coverage</h3>
                  <p className="text-sm text-gray-600">Comprehensive reporting from all 13 districts of Uttarakhand</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Digital Innovation</h3>
                  <p className="text-sm text-gray-600">Modern web stories and multimedia content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithLongContent: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <article>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Sacred Valley of Flowers Blooms Again: Uttarakhand's Hidden Paradise Welcomes Visitors
              </h1>
              <div className="prose max-w-none text-gray-600 space-y-4">
                <p>The UNESCO World Heritage site Valley of Flowers has reopened its gates to nature enthusiasts and trekkers after a successful three-year conservation program. Located in Chamoli district, this pristine alpine meadow is now home to over 520 species of flowering plants.</p>
                
                <p>The remarkable recovery represents one of Uttarakhand's most successful environmental conservation stories. Local communities have played a crucial role in protecting this fragile ecosystem, working alongside government agencies and international conservation organizations.</p>
                
                <p>Visitors can now witness the spectacular carpet of colors that includes rare Himalayan blue poppies, brahmakamal, and countless other endemic species. The best time to visit remains July to September when the flowers are in full bloom.</p>
                
                <p>The state tourism department has introduced sustainable trekking practices to ensure the valley's protection while allowing visitors to experience its natural beauty. New eco-friendly facilities and guided tours are now available.</p>
                
                <p>This conservation success story serves as a model for other protected areas across the Himalayan region, demonstrating how community involvement and scientific management can preserve natural heritage for future generations.</p>
              </div>
            </article>
            
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Himalayan Wildlife Conservation</h3>
                  <p className="text-sm text-gray-600">New initiatives protect endangered species across Uttarakhand's national parks.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Eco-Tourism Growth</h3>
                  <p className="text-sm text-gray-600">Sustainable tourism practices boost local economies while preserving nature.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Community Conservation</h3>
                  <p className="text-sm text-gray-600">Local communities become guardians of Uttarakhand's natural heritage.</p>
                </div>
              </div>
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
        story: "Footer displayed after a long article with extensive content, showing how it appears in a realistic news article context with proper spacing and visual separation.",
      },
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile view showing how the footer's 4-column grid collapses to a single column layout on smaller screens, maintaining readability and usability.",
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
        story: "Tablet view demonstrating the footer's responsive behavior on medium-sized screens with adjusted grid layout and spacing.",
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
        story: "Full desktop view showcasing the footer's complete 4-column grid layout with optimal spacing and typography.",
      },
    },
  },
};

export const WithoutContent: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col justify-end">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Footer displayed without main content, showing its standalone appearance and spacing. Useful for testing footer-only pages or minimal layouts.",
      },
    },
  },
};

export const ContrastCheck: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Dark Content Section</h2>
              <p>This dark section helps test the visual contrast and separation between main content and the footer component.</p>
            </div>
            <div className="bg-orange-500 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Brand Color Section</h2>
              <p>Testing with HillsQuills brand orange color to ensure proper visual hierarchy.</p>
            </div>
            <div className="bg-teal-600 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Accent Color Section</h2>
              <p>Testing with HillsQuills accent teal color for complete brand color testing.</p>
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
        story: "Footer displayed after various colored content sections to test visual contrast, separation, and brand color harmony.",
      },
    },
  },
};

export const StandaloneFooter: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Footer component displayed in isolation with padding, perfect for component documentation and design review.",
      },
    },
  },
};

export const InteractionDemo: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Footer Interaction Demo</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 Interactive Elements to Test:</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Hover over social media icons (Facebook, Twitter, Instagram, YouTube)</li>
                <li>• Hover over category navigation links</li>
                <li>• Hover over district links</li>
                <li>• Click the HillsQuills logo to navigate home</li>
                <li>• Hover over contact email link</li>
                <li>• Hover over bottom legal links (About Us, Privacy Policy, Terms)</li>
              </ul>
            </div>
            <p className="text-gray-600 mb-4">
              The footer includes multiple interactive elements with hover effects that change color from gray to orange (brand color). 
              All links are functional and include proper accessibility attributes.
            </p>
            <p className="text-gray-600">
              The brand logo combines teal and orange colors representing the Hills (teal) and Quills (orange) elements of the publication name.
            </p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Interactive demonstration of the footer with instructions for testing hover effects, link functionality, and brand color transitions.",
      },
    },
  },
};

export const ContentSections: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Brand Section</h2>
              <p className="text-gray-600">Features the HillsQuills logo with teal "Hills" and orange "Quills" branding, tagline, and social media links.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📰 Categories Section</h2>
              <p className="text-gray-600">Navigation links to main content categories: Latest News, Top News, Culture, Web Stories, and Videos.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏔️ Districts Section</h2>
              <p className="text-gray-600">Links to major Uttarakhand districts: Dehradun, Haridwar, Nainital, Uttarkashi, plus "All Districts" page.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 Contact Section</h2>
              <p className="text-gray-600">Complete contact information including address in Dehradun, email, phone, and organization name (UKNEXT).</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Legal Section</h2>
              <p className="text-gray-600">Copyright notice and legal links for About Us, Privacy Policy, and Terms of Service.</p>
            </section>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Detailed breakdown of all footer sections with explanations of their purpose and content, useful for documentation and content review.",
      },
    },
  },
};

export const AccessibilityTest: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Accessibility Features</h1>
            <div className="space-y-4 text-gray-600">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Keyboard Navigation</h3>
                <p className="text-green-800 text-sm">All links and interactive elements are focusable and navigable via keyboard.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Color Contrast</h3>
                <p className="text-green-800 text-sm">Text colors meet WCAG contrast requirements against gray-50 background.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Semantic Structure</h3>
                <p className="text-green-800 text-sm">Proper use of footer, nav, and heading elements for screen readers.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✅ Link Context</h3>
                <p className="text-green-800 text-sm">All links have meaningful text and hover states for better usability.</p>
              </div>
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
        story: "Accessibility testing story highlighting the footer's compliance with web accessibility standards including keyboard navigation, color contrast, and semantic structure.",
      },
    },
  },
};
