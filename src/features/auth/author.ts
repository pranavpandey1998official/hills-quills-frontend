

import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  is_active: z.number(),
  profession: z.string().optional(),
  about: z.string().optional(),
  profile_photo_url: z.string().url().optional(),
});

export type Author = z.infer<typeof AuthorSchema>;
  
export interface AuthorsState {
    items: Author[]
    profile: Author | null
    isLoading: boolean
    error: string | null
    totalCount: number
    currentPage: number
    totalPages: number
    perPage: number
  }

  export interface AuthorDashboardLayoutProps {
    children: React.ReactNode
  }

  export interface ProfileViewProps {
    profile: Author | null
    isLoading?: boolean
  }

  export interface ProfileEditFormProps {
    profile: Author | null
    onSave: () => void
    onCancel: () => void  // Added this prop
  }