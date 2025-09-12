import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImagePicker } from "./image-picker";
import { ImageFile, PREVIEW_ARTICLE_IMAGE } from "@/types/common";

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
    value: PREVIEW_ARTICLE_IMAGE,
    placeholderSrc: "/images/placeholder.png",
    ariaLabel: "Upload image",
    onChange: (imageFile: ImageFile | undefined) => console.log("Image selected:", imageFile),
  },
};

export const WithImage: Story = {
  args: {
    value: {
      previewUrl: "/images/licensed-image.jpg",
      file: new File([""], "example.jpg", { type: "image/jpeg" }),
    },
    placeholderSrc: "/images/placeholder.png",
    ariaLabel: "Upload image",
    onChange: (imageFile: ImageFile | undefined) => console.log("Image selected:", imageFile),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: PREVIEW_ARTICLE_IMAGE,
    placeholderSrc: "/images/custom-placeholder.jpg",
    ariaLabel: "Upload custom image",
    onChange: (imageFile: ImageFile | undefined) => console.log("Image selected:", imageFile),
  },
};