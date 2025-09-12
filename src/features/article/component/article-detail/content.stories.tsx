import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleDetailContent from "./content";

const meta: Meta<typeof ArticleDetailContent> = {
  title: "articles/ArticleDetail/Content",
  component: ArticleDetailContent,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A component that renders markdown content using MDEditor for article body content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      description: "Markdown content string to render",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMarkdown = `# Uttarakhand Government Launches New Eco-Tourism Initiative

The Uttarakhand government has announced a **groundbreaking eco-tourism initiative** aimed at promoting sustainable tourism while protecting the state's pristine forest ecosystems.

## Key Features

The program will focus on creating responsible tourism opportunities in designated protected areas across the Himalayan state:

- **Nature trails** and wildlife observation points
- **Sustainable accommodation** facilities
- **Community involvement** programs
- **Environmental protection** measures

### Community Benefits

This initiative represents a significant step toward balancing economic development with environmental conservation. Local communities will be actively involved in the program, ensuring that tourism benefits reach grassroots levels while maintaining ecological integrity.

> "Tourism should enrich both visitors and local communities while preserving our natural heritage for future generations." - Tourism Minister

## Implementation Timeline

1. **Phase 1**: Pilot projects in three protected forest areas
2. **Phase 2**: Expansion based on initial results
3. **Phase 3**: State-wide implementation

The program includes the development of nature trails, wildlife observation points, and sustainable accommodation facilities that blend harmoniously with the natural environment.

For more information, visit [Uttarakhand Tourism](https://uttarakhandtourism.gov.in).`;

const shortMarkdown = `The Uttarakhand government has announced a new eco-tourism initiative to promote **sustainable tourism** while protecting forest ecosystems.

Key highlights:
- Community involvement
- Environmental protection
- Economic development`;

const richMarkdown = `# Ancient Temples of Kedarnath

## Historical Significance

The **Kedarnath Temple** is one of the twelve Jyotirlingas and holds immense spiritual significance in Hindu mythology.

### Architecture

The temple showcases remarkable ancient architecture:

- Built with large stone slabs
- Conical-shaped structure
- Mandapa and garbha griha design

## Pilgrimage Journey

> The journey to Kedarnath is not just a physical one, but a spiritual transformation.

### Route Options

1. **Traditional Trek**: 14 km from Gaurikund
2. **Helicopter Service**: Available during pilgrimage season
3. **Pony/Doli Service**: For elderly pilgrims

## Cultural Impact

The temple has been a center of:
- **Spiritual learning**
- **Cultural preservation**
- **Community gathering**

### Festivals Celebrated

- Maha Shivaratri
- Kedarnath Yatra season
- Local cultural festivals

**Important Note**: The temple is only accessible during specific months due to extreme weather conditions.

![Temple Image](placeholder for temple image)

For detailed pilgrimage information, consult local guides or visit official websites.`;

export const Default: Story = {
  name: "Default Content",
  args: {
    content: sampleMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story: "Default article content with typical markdown formatting including headers, lists, and emphasis.",
      },
    },
  },
};

export const ShortContent: Story = {
  name: "Short Content",
  args: {
    content: shortMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story: "Shorter article content with basic formatting.",
      },
    },
  },
};

export const RichContent: Story = {
  name: "Rich Content",
  args: {
    content: richMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story: "Rich content with complex markdown including blockquotes, nested lists, and multiple sections.",
      },
    },
  },
};

export const PlainText: Story = {
  name: "Plain Text",
  args: {
    content: "This is a simple article with plain text content. No markdown formatting is used here, just regular text that demonstrates how the component handles basic content.",
  },
  parameters: {
    docs: {
      description: {
        story: "Plain text content without any markdown formatting.",
      },
    },
  },
};

export const CodeContent: Story = {
  name: "With Code Blocks",
  args: {
    content: `# Technical Article

Here's some code for environment setup:

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

And inline code: \`npm install\`

## Configuration

Set up your \`.env\` file:

\`\`\`env
API_URL=https://api.example.com
NODE_ENV=development
\`\`\`

That's it!`,
  },
  parameters: {
    docs: {
      description: {
        story: "Content with code blocks and inline code formatting.",
      },
    },
  },
};

export const EmptyContent: Story = {
  name: "Empty Content",
  args: {
    content: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Edge case with empty content string.",
      },
    },
  },
};

export const ListsAndTables: Story = {
  name: "Lists and Tables",
  args: {
    content: `# District Information

## Uttarakhand Districts

### Hill Districts
- Almora
- Bageshwar
- Chamoli
- Champawat
- Nainital
- Pithoragarh
- Rudraprayag
- Uttarkashi

### Plains Districts
- Dehradun
- Haridwar
- Udham Singh Nagar

## District Statistics

| District | Area (sq km) | Population | Headquarters |
|----------|-------------|------------|--------------|
| Dehradun | 3,088 | 1,696,694 | Dehradun |
| Haridwar | 2,360 | 1,890,422 | Haridwar |
| Nainital | 4,251 | 954,605 | Nainital |

### Key Features
1. **Mountain regions** with high altitude
2. **River valleys** and plains
3. **Forest coverage** over 65%`,
  },
  parameters: {
    docs: {
      description: {
        story: "Content with various list types and table formatting.",
      },
    },
  },
};
