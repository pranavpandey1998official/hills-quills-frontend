import type { Meta, StoryObj } from "@storybook/react";
import ArticleForm, { ArticleFormProps, ArticleFormState } from "./ArticleForm";
import { Category, Region } from "@/types/articles";

const meta: Meta<typeof ArticleForm> = {
  title: "forms/ArticleForm",
  component: ArticleForm,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A comprehensive form component for creating and editing articles with title, image, tags, region/category selection, and markdown content editor.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Form data object containing all article form fields",
      control: { type: "object" },
    },
    onChange: {
      description: "Callback function triggered when any form field changes",
      action: "changed",
    },
    previewImageUrl: {
      description: "Optional URL for image preview",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock onChange function
const mockOnChange = (field: string, value: any) => {
  console.log(`Field ${field} changed to:`, value);
};

// Initial empty form state
const emptyFormData: ArticleFormState = {
  title: "",
  imageFile: undefined,
  tags: [],
  region: undefined,
  category: undefined,
  content: "",
};

// Partially filled form data
const partialFormData: ArticleFormState = {
  title: "Eco-Tourism Initiative in Uttarakhand",
  imageFile: undefined,
  tags: ["environment", "tourism"],
  region: Region.Nainital,
  category: undefined,
  content: "# Introduction\n\nThe government has announced...",
};

// Fully filled form data
const completeFormData: ArticleFormState = {
  title: "Uttarakhand Government Launches New Eco-Tourism Initiative in Protected Forest Areas",
  imageFile: undefined,
  tags: ["eco-tourism", "forest-conservation", "sustainable-development", "uttarakhand", "environment"],
  region: Region.Nainital,
  category: Category.Environment,
  content: `# Uttarakhand Government Launches New Eco-Tourism Initiative

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

The program includes the development of nature trails, wildlife observation points, and sustainable accommodation facilities that blend harmoniously with the natural environment.`,
};

// Culture article data
const cultureFormData: ArticleFormState = {
  title: "Ancient Temples of Kedarnath: A Spiritual Journey Through Sacred Architecture",
  imageFile: undefined,
  tags: ["temples", "culture", "kedarnath", "spirituality", "architecture", "heritage"],
  region: Region.Rudraprayag,
  category: Category.Culture,
  content: `# Ancient Temples of Kedarnath

## Historical Significance

The **Kedarnath Temple** is one of the twelve Jyotirlingas and holds immense spiritual significance in Hindu mythology.

### Architecture

The temple showcases remarkable ancient architecture:

- Built with large stone slabs
- Conical-shaped structure
- Mandapa and garbha griha design

## Pilgrimage Journey

> The journey to Kedarnath is not just a physical one, but a spiritual transformation.`,
};

export const Empty: Story = {
  name: "Empty Form",
  args: {
    data: emptyFormData,
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty form state showing all fields in their initial, unfilled state.",
      },
    },
  },
};

export const PartiallyFilled: Story = {
  name: "Partially Filled",
  args: {
    data: partialFormData,
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Form with some fields filled - title, tags, region, and basic content.",
      },
    },
  },
};

export const CompleteArticle: Story = {
  name: "Complete Article",
  args: {
    data: completeFormData,
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Fully completed form with all fields filled including comprehensive markdown content.",
      },
    },
  },
};

export const CultureArticle: Story = {
  name: "Culture Article",
  args: {
    data: cultureFormData,
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Form filled with culture category content about Kedarnath temples.",
      },
    },
  },
};

export const TourismArticle: Story = {
  name: "Tourism Article",
  args: {
    data: {
      title: "Hidden Gems of Kumaon: Offbeat Destinations for Adventure Seekers",
      imageFile: undefined,
      tags: ["tourism", "adventure", "kumaon", "hidden-gems", "trekking", "hill-stations"],
      region: Region.Almora,
      category: Category.Tourism,
      content: `# Hidden Gems of Kumaon

Discover the lesser-known treasures of the Kumaon region that offer unique experiences for adventure enthusiasts.

## Top Destinations

### 1. Binsar Wildlife Sanctuary
- **Best for**: Wildlife photography and bird watching
- **Trek difficulty**: Easy to moderate
- **Best time**: October to March

### 2. Chaukori
- **Best for**: Panoramic Himalayan views
- **Activities**: Nature walks, sunrise viewing
- **Accommodation**: Eco-friendly homestays

## Planning Your Trip

**Essential items to pack:**
- Warm clothing
- Trekking shoes
- Camera equipment
- First aid kit`,
    },
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Tourism-focused article with adventure and travel content.",
      },
    },
  },
};

export const WithImagePreview: Story = {
  name: "With Image Preview",
  args: {
    data: completeFormData,
    onChange: mockOnChange,
    previewImageUrl: "/images/temple-story.jpg",
  },
  parameters: {
    docs: {
      description: {
        story: "Form with an existing image preview URL showing how the image picker displays current images.",
      },
    },
  },
};

export const ShortNewsArticle: Story = {
  name: "Short News Article",
  args: {
    data: {
      title: "New Highway Project Approved for Pithoragarh District",
      imageFile: undefined,
      tags: ["infrastructure", "highway", "development", "pithoragarh"],
      region: Region.Pithoragarh,
      category: Category.Politics,
      content: `The state government has approved a new highway project connecting remote areas of Pithoragarh district to improve connectivity and boost economic development.

**Key highlights:**
- Total length: 45 kilometers
- Budget allocation: ₹250 crores
- Expected completion: 2025
- Benefits: Improved access to markets and healthcare facilities`,
    },
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Short news article with concise content and politics category.",
      },
    },
  },
};

export const HealthArticle: Story = {
  name: "Health Article",
  args: {
    data: {
      title: "Traditional Medicinal Plants of Uttarakhand: Ancient Wisdom for Modern Health",
      imageFile: undefined,
      tags: ["health", "traditional-medicine", "ayurveda", "herbs", "healthcare"],
      region: Region.Chamoli,
      category: Category.Health,
      content: `# Traditional Medicinal Plants of Uttarakhand

Uttarakhand's rich biodiversity includes numerous medicinal plants that have been used in traditional healing for centuries.

## Common Medicinal Plants

| Plant Name | Scientific Name | Uses | Availability |
|------------|----------------|------|--------------|
| Brahmi | Bacopa monnieri | Memory enhancement | High altitude areas |
| Kutki | Picrorhiza kurroa | Liver disorders | Alpine regions |
| Jatamansi | Nardostachys jatamansi | Stress relief | Himalayan slopes |

## Conservation Efforts

> "These plants are our natural pharmacy, but they need protection from over-harvesting." - Dr. Asha Pant, Botanist

### Sustainable Practices
1. Controlled harvesting
2. Community awareness programs
3. Cultivation initiatives
4. Research and documentation`,
    },
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Health category article with table formatting and scientific content.",
      },
    },
  },
};

export const ManyTags: Story = {
  name: "Many Tags",
  args: {
    data: {
      title: "Comprehensive Guide to Uttarakhand's Biodiversity and Conservation Efforts",
      imageFile: undefined,
      tags: [
        "biodiversity",
        "conservation",
        "wildlife",
        "environment",
        "forestry",
        "ecology",
        "sustainability",
        "climate-change",
        "tiger-reserve",
        "national-parks",
        "endangered-species",
        "research",
        "government-policy",
        "community-conservation",
        "eco-system",
      ],
      region: Region.Uttarkashi,
      category: Category.Environment,
      content: "A comprehensive overview of Uttarakhand's rich biodiversity and ongoing conservation efforts...",
    },
    onChange: mockOnChange,
  },
  parameters: {
    docs: {
      description: {
        story: "Form with many tags to test the tags input component's handling of multiple items.",
      },
    },
  },
};
