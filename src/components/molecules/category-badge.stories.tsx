import type { Meta, StoryObj } from "@storybook/react";
import CategoryBadge from "./category-badge";
import { Category } from "@/types/common";

const meta: Meta<typeof CategoryBadge> = {
  title: "molecules/CategoryBadge",
  component: CategoryBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A badge component for displaying article categories with a slate background.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    category: {
      description: "The category to display in the badge.",
      control: { type: "select" },
      options: Object.values(Category),
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryBadge>;

export const Politics: Story = {
  args: {
    category: Category.Politics,
  },
};

export const Defence: Story = {
  args: {
    category: Category.Defence,
  },
};

export const Economy: Story = {
  args: {
    category: Category.Economy,
  },
};

export const Environment: Story = {
  args: {
    category: Category.Environment,
  },
};

export const Education: Story = {
  args: {
    category: Category.Education,
  },
};

export const Health: Story = {
  args: {
    category: Category.Health,
  },
};

export const Tourism: Story = {
  args: {
    category: Category.Tourism,
  },
};

export const Culture: Story = {
  args: {
    category: Category.Culture,
  },
};

export const AllCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(Category).map((category) => (
        <CategoryBadge key={category} category={category} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows all available category badges together.",
      },
    },
  },
};
