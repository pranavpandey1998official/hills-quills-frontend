import type { Meta, StoryObj } from "@storybook/react";
import RegionBadge from "./region-badge";
import { Region } from "@/types/common";

const meta: Meta<typeof RegionBadge> = {
  title: "molecules/RegionBadge",
  component: RegionBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A badge component for displaying regions with an orange background.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    region: {
      description: "The region to display in the badge.",
      control: { type: "select" },
      options: Object.values(Region),
    },
  },
};

export default meta;
type Story = StoryObj<typeof RegionBadge>;

export const Almora: Story = {
  args: {
    region: Region.Almora,
  },
};

export const Bageshwar: Story = {
  args: {
    region: Region.Bageshwar,
  },
};

export const Chamoli: Story = {
  args: {
    region: Region.Chamoli,
  },
};

export const Champawat: Story = {
  args: {
    region: Region.Champawat,
  },
};

export const Dehradun: Story = {
  args: {
    region: Region.Dehradun,
  },
};

export const Haridwar: Story = {
  args: {
    region: Region.Haridwar,
  },
};

export const Nainital: Story = {
  args: {
    region: Region.Nainital,
  },
};

export const PauriGarhwal: Story = {
  args: {
    region: Region.PauriGarhwal,
  },
};

export const Pithoragarh: Story = {
  args: {
    region: Region.Pithoragarh,
  },
};

export const Rudraprayag: Story = {
  args: {
    region: Region.Rudraprayag,
  },
};

export const TehriGarhwal: Story = {
  args: {
    region: Region.TehriGarhwal,
  },
};

export const UdhamSinghNagar: Story = {
  args: {
    region: Region.UdhamSinghNagar,
  },
};

export const Uttarkashi: Story = {
  args: {
    region: Region.Uttarkashi,
  },
};

export const AllRegions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(Region).map((region) => (
        <RegionBadge key={region} region={region} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows all available region badges together for comparison.",
      },
    },
  },
};
