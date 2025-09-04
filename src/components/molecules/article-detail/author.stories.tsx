import type { Meta, StoryObj } from "@storybook/react";
import { AuthorCard } from "./author";

const meta: Meta<typeof AuthorCard> = {
  title: "molecules/ArticleDetail/AuthorCard",
  component: AuthorCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An author card component that displays author information including profile photo, name, role, and bio in a styled card format.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Author's full name",
      control: { type: "text" },
    },
    profile_photo_url: {
      description: "URL to author's profile photo",
      control: { type: "text" },
    },
    profession: {
      description: "Author's profession or job title",
      control: { type: "text" },
    },
    about: {
      description: "Brief bio or description about the author",
      control: { type: "text" },
    },
    role: {
      description: "Author's role or designation",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default Author",
  args: {
    name: "Dr. Meera Joshi",
    profile_photo_url: "/images/avatar.jpg",
    profession: "Environmental Journalist",
    about: "Dr. Meera Joshi is an experienced environmental journalist with over 15 years of expertise in covering Himalayan ecology and sustainable development. She holds a PhD in Environmental Science and has authored several research papers on mountain ecosystems.",
    role: "Senior Reporter",
  },
  parameters: {
    docs: {
      description: {
        story: "Default author card with complete information including profile photo, name, profession, and detailed bio.",
      },
    },
  },
};

export const TravelWriter: Story = {
  name: "Travel Writer",
  args: {
    name: "Ravi Kumar",
    profile_photo_url: "/images/avatar.1.png",
    profession: "Travel & Adventure Writer",
    about: "Ravi Kumar is a passionate travel writer who has explored every corner of Uttarakhand. His adventure stories and travel guides have inspired thousands to discover the hidden gems of the Himalayas.",
    role: "Contributing Writer",
  },
  parameters: {
    docs: {
      description: {
        story: "Travel writer profile showcasing adventure and tourism expertise.",
      },
    },
  },
};

export const CulturalExpert: Story = {
  name: "Cultural Expert",
  args: {
    name: "Priya Sharma",
    profile_photo_url: "/images/licensed-image.jpg",
    profession: "Cultural Heritage Specialist",
    about: "Priya Sharma specializes in documenting and preserving the rich cultural heritage of Uttarakhand. She has written extensively about traditional festivals, folk art, and ancient temples.",
    role: "Cultural Correspondent",
  },
  parameters: {
    docs: {
      description: {
        story: "Cultural expert profile highlighting heritage and traditional knowledge.",
      },
    },
  },
};

export const LocalReporter: Story = {
  name: "Local Reporter",
  args: {
    name: "Vikash Singh",
    profile_photo_url: "/images/licensed-image-2.jpg",
    profession: "Local News Reporter",
    about: "Born and raised in Nainital, Vikash Singh brings authentic local perspective to regional news coverage.",
    role: "Local Correspondent",
  },
  parameters: {
    docs: {
      description: {
        story: "Local reporter with brief, focused bio and regional expertise.",
      },
    },
  },
};

export const StaffWriter: Story = {
  name: "Staff Writer",
  args: {
    name: "Staff Reporter",
    profile_photo_url: "/images/placeholder.png",
    profession: "Journalist",
    about: "Our dedicated staff reporters work tirelessly to bring you the latest news and updates from across Uttarakhand.",
    role: "Staff Writer",
  },
  parameters: {
    docs: {
      description: {
        story: "Generic staff writer profile for articles without specific author attribution.",
      },
    },
  },
};

export const NoProfilePhoto: Story = {
  name: "No Profile Photo",
  args: {
    name: "Anonymous Contributor",
    profile_photo_url: "",
    profession: "Guest Writer",
    about: "An experienced writer contributing valuable insights about regional development and community issues in Uttarakhand.",
    role: "Guest Contributor",
  },
  parameters: {
    docs: {
      description: {
        story: "Author card without profile photo, showing fallback placeholder behavior.",
      },
    },
  },
};

export const LongBio: Story = {
  name: "Long Bio",
  args: {
    name: "Dr. Rajesh Pandey",
    profile_photo_url: "/images/avatar.jpg",
    profession: "Environmental Policy Researcher",
    about: "Dr. Rajesh Pandey is a distinguished environmental policy researcher and academic with over two decades of experience in sustainable development. He has served as an advisor to multiple government initiatives focused on mountain ecology, climate change adaptation, and community-based conservation programs. His extensive research has been published in numerous international journals, and he frequently speaks at global conferences on environmental policy. Dr. Pandey holds a PhD from IIT Delhi and has been instrumental in developing several successful eco-tourism projects across the Indian Himalayas.",
    role: "Research Director",
  },
  parameters: {
    docs: {
      description: {
        story: "Author with lengthy bio to test text wrapping and layout with extensive content.",
      },
    },
  },
};

export const MinimalInfo: Story = {
  name: "Minimal Info",
  args: {
    name: "A. Singh",
    profile_photo_url: "/images/placeholder.png",
    profession: "Writer",
    about: "Local correspondent.",
    role: "Reporter",
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal author information to test layout with very brief content.",
      },
    },
  },
};

export const PhotographerProfile: Story = {
  name: "Photographer Profile",
  args: {
    name: "Arjun Bisht",
    profile_photo_url: "/images/licensed-image.jpg",
    profession: "Nature Photographer",
    about: "Arjun Bisht captures the stunning landscapes and wildlife of Uttarakhand through his lens. His photography has been featured in National Geographic and other international publications.",
    role: "Staff Photographer",
  },
  parameters: {
    docs: {
      description: {
        story: "Photographer profile showcasing visual storytelling expertise.",
      },
    },
  },
};
