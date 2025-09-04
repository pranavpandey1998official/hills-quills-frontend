import { url } from "inspector";
import { z } from "zod";

export const LoginResponseSchema = z.object({
    token: z.string(),
    refresh_token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const UploadImageResponseSchema = z.object({
    url: z.url(),
});

export type UploadImageResponse = z.infer<typeof UploadImageResponseSchema>;