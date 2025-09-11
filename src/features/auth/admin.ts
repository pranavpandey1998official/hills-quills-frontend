import z from 'zod';

export interface AdminProfile {
    id: number
    username: string
    email: string
    created_at: string
    is_admin: boolean
}
  
export interface AdminState {
    profile: AdminProfile | null
    isLoading: boolean
    isUpdating: boolean
    otpLoading: boolean
    error: string | null
    successMessage: string | null
}


export const AdminSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    role: z.string(),
});

export type Admin = z.infer<typeof AdminSchema>;
