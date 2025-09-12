import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagsInput } from "./tags-input";

const meta: Meta<typeof TagsInput> = {
  title: "molecules/TagsInput",
  component: TagsInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A component for adding and managing tags with an input field and badges.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "Unique identifier for the input field.",
      control: { type: "text" },
    },
    value: {
      description: "Array of tags currently added.",
      control: { type: "object" },
    },
    onChange: {
      description: "Callback function triggered when tags are added or removed.",
      action: "tagsChanged",
    },
    placeholder: {
      description: "Placeholder text for the input field.",
      control: { type: "text" },
    },
    className: {
      description: "Additional classes for styling the component.",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
  args: {
    id: "tags-input",
    value: ["himalayas", "travel", "adventure"],
    placeholder: "Type a tag and press enter",
    onChange: (tags: string[]) => console.log("Tags updated:", tags),
  },
};

export const Empty: Story = {
  args: {
    id: "tags-input-empty",
    value: [],
    placeholder: "Add your first tag",
    onChange: (tags: string[]) => console.log("Tags updated:", tags),
  },
};

export const WithCustomClass: Story = {
  args: {
    id: "tags-input-custom",
    value: ["custom", "style"],
    placeholder: "Custom styled tags",
    className: "bg-gray-100 p-4 rounded-lg",
    onChange: (tags: string[]) => console.log("Tags updated:", tags),
  },
};