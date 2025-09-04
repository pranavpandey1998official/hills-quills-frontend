import type { Meta, StoryObj } from "@storybook/react"
import { WebStories, Story } from "./web-stories"

const meta: Meta<typeof WebStories> = {
  title: "Components/WebStories",
  component: WebStories,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A component for displaying web stories with images, titles, categories, and regions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    stories: {
      description: "Array of story objects to display",
      control: { type: "object" },
    },
  },
}

export default meta
type StorybookStory = StoryObj<typeof WebStories>

const mockStories: Story[] = [
  {
    id: "1",
    title: "Ancient Temples of the Himalayas",
    category: "Heritage",
    region: "Uttarakhand",
    image: "/images/temple-story.jpg",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: "2",
    title: "Wildlife Sanctuaries: A Natural Paradise",
    category: "Nature",
    region: "Jim Corbett",
    image: "/images/temple-story.jpg",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: "3",
    title: "Traditional Crafts and Artisans",
    category: "Culture",
    region: "Kumaon",
    image: "/images/temple-story.jpg",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "4",
    title: "Mountain Trekking Adventures",
    category: "Adventure",
    region: "Garhwal",
    image: "/images/temple-story.jpg",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: "5",
    title: "Local Cuisine and Food Culture",
    category: "Food",
    region: "Nainital",
    image: "/images/temple-story.jpg",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: "7",
    title: "Local Cuisine and Food Culture",
    category: "Food",
    region: "Nainital",
    image: "/images/temple-story.jpg",
    gradient: "from-yellow-400 to-orange-500",
  },
]

export const Default: StorybookStory = {
  args: {
    stories: mockStories,
  },
}

export const SingleStory: StorybookStory = {
  args: {
    stories: [mockStories[0]],
  },
}

export const TwoStories: StorybookStory = {
  args: {
    stories: mockStories.slice(0, 2),
  },
}

export const EmptyState: StorybookStory = {
  args: {
    stories: [],
  },
}