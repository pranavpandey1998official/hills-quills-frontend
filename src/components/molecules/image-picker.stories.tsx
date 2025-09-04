import type { Meta, StoryObj } from "@storybook/react";
import { ImagePicker } from "./image-picker";

const meta: Meta<typeof ImagePicker> = {
  title: "molecules/ImagePicker",
  component: ImagePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A component for selecting and previewing images with options to upload, change, or remove the image.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The currently selected image file.",
      control: { type: "object" },
    },
    onChange: {
      description: "Callback function triggered when the image is changed.",
      action: "imageChanged",
    },
    placeholderSrc: {
      description: "Source URL for the placeholder image.",
      control: { type: "text" },
    },
    ariaLabel: {
      description: "Aria-label for the file input.",
      control: { type: "text" },
    },
    className: {
      description: "Additional classes for styling the component.",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {
  args: {
    value: null,
    placeholderSrc: "/images/placeholder.png",
    ariaLabel: "Upload image",
    onChange: (file: File | null) => console.log("Image selected:", file),
  },
};

export const WithImage: Story = {
  args: {
    value: new File([""], "example.jpg", { type: "image/jpeg" }),
    placeholderSrc: "/images/placeholder.png",
    ariaLabel: "Upload image",
    onChange: (file: File | null) => console.log("Image selected:", file),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: null,
    placeholderSrc: "/images/custom-placeholder.jpg",
    ariaLabel: "Upload custom image",
    onChange: (file: File | null) => console.log("Image selected:", file),
  },
};