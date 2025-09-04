import type { Meta, StoryObj } from "@storybook/react";
import ArticleDetailTags from "./tags";

const meta: Meta<typeof ArticleDetailTags> = {
  title: "molecules/ArticleDetail/Tags",
  component: ArticleDetailTags,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A component that displays article tags as badges with a border separator and topic label.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tags: {
      description: "Array of tag strings to display as badges",
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Tags",
  args: {
    tags: ["eco-tourism", "forest-conservation", "sustainable-development", "uttarakhand"],
  },
  parameters: {
    docs: {
      description: {
        story: "Default view with a typical set of article tags related to environment and tourism.",
      },
    },
  },
};

export const MinimalTags: Story = {
  name: "Minimal Tags",
  args: {
    tags: ["news", "breaking"],
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal example with just two tags.",
      },
    },
  },
};

export const ManyTags: Story = {
  name: "Many Tags",
  args: {
    tags: [
      "uttarakhand",
      "himalayas",
      "eco-tourism",
      "forest-conservation",
      "sustainable-development",
      "environment",
      "nature",
      "wildlife",
      "trekking",
      "adventure",
      "culture",
      "heritage",
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Example with many tags to test wrapping behavior and layout with multiple lines.",
      },
    },
  },
};

export const CultureTags: Story = {
  name: "Culture Tags",
  args: {
    tags: ["temples", "culture", "kedarnath", "spirituality", "architecture", "heritage"],
  },
  parameters: {
    docs: {
      description: {
        story: "Culture-focused tags for heritage and spiritual content.",
      },
    },
  },
};

export const TourismTags: Story = {
  name: "Tourism Tags",
  args: {
    tags: ["tourism", "adventure", "kumaon", "hidden-gems", "trekking", "hill-stations"],
  },
  parameters: {
    docs: {
      description: {
        story: "Tourism and adventure-related tags.",
      },
    },
  },
};

export const LongTagNames: Story = {
  name: "Long Tag Names",
  args: {
    tags: [
      "environmental-conservation-initiative",
      "sustainable-tourism-development",
      "uttarakhand-government-policy",
      "community-based-tourism",
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Tags with longer names to test how the component handles lengthy text.",
      },
    },
  },
};

export const EmptyTags: Story = {
  name: "Empty Tags",
  args: {
    tags: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Edge case with no tags to display.",
      },
    },
  },
};

export const SingleTag: Story = {
  name: "Single Tag",
  args: {
    tags: ["breaking-news"],
  },
  parameters: {
    docs: {
      description: {
        story: "Single tag display to test minimal layout.",
      },
    },
  },
};
