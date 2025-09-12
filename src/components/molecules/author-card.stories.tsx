import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AuthorCard } from "./author-card"

const meta: Meta<typeof AuthorCard> = {
  title: "molecules/AuthorCard",
  component: AuthorCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A card component that displays author information including avatar, name, role, and bio.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-md w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    author: {
      description: "Author object containing name, role, image URL, and bio",
      control: { type: "object" },
    },
  },
}

export default meta
type Story = StoryObj<typeof AuthorCard>

export const Default: Story = {
  args: {
    author: {
      name: "Priya Sharma",
      role: "Travel Writer & Cultural Enthusiast",
      image: "/images/avatar.1.png",
      bio: "Priya has been exploring the hidden gems of Uttarakhand for over a decade. Her passion for mountain culture and sustainable tourism drives her storytelling.",
    },
  },
}

export const LongBio: Story = {
  args: {
    author: {
      name: "Rajesh Kumar",
      role: "Wildlife Photographer",
      image: "/images/avatar.jpg",
      bio: "With 15 years of experience capturing the majestic wildlife of the Himalayas, Rajesh brings unique perspectives on conservation and natural beauty. His work has been featured in National Geographic and BBC Wildlife Magazine.",
    },
  },
}

export const ShortBio: Story = {
  args: {
    author: {
      name: "Anita Bisht",
      role: "Food Blogger",
      image: "/images/avatar.jpg",
      bio: "Exploring the authentic flavors of Uttarakhand, one dish at a time.",
    },
  },
}

export const NoImage: Story = {
  args: {
    author: {
      name: "Guest Author",
      role: "Contributing Writer",
      image: "",
      bio: "This author prefers to let their words speak for themselves, sharing insights about the beautiful landscapes and rich culture of the hills.",
    },
  },
}

export const MultipleRoles: Story = {
  args: {
    author: {
      name: "Dr. Vikram Singh",
      role: "Historian, Author & Heritage Conservationist",
      image: "/images/avatar.jpg",
      bio: "Dr. Singh has dedicated his life to preserving the cultural heritage of Uttarakhand through extensive research and documentation.",
    },
  },
}