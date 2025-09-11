import type { Meta, StoryObj } from "@storybook/react";
import { PaginationControls } from "./pagination-controls";
import { PaginationControlsProps } from "./pagination-controls";

const meta: Meta<typeof PaginationControls> = {
  title: "Components/PaginationControls",
  component: PaginationControls,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A component for navigating paginated data, showing the current range of items and allowing navigation between pages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    totalCount: {
      description: "Total number of items to paginate.",
      control: { type: "number" },
    },
    currentPage: {
      description: "The current active page.",
      control: { type: "number" },
    },
    pageSize: {
      description: "Number of items per page.",
      control: { type: "number" },
    },
    onPageChange: {
      description: "Callback function triggered when the page changes.",
      action: "pageChanged",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationControls>;

export const Default: Story = {
  args: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  },
};

export const MiddlePage: Story = {
  args: {
    totalCount: 100,
    currentPage: 5,
    pageSize: 10,
    onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  },
};

export const LastPage: Story = {
  args: {
    totalCount: 100,
    currentPage: 10,
    pageSize: 10,
    onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  },
};

export const SinglePage: Story = {
  args: {
    totalCount: 5,
    currentPage: 1,
    pageSize: 10,
    onPageChange: (page: number) => console.log(`Page changed to: ${page}`),
  },
};