import { LoginResponseSchema } from "@/types/common";
import { apiClient } from "./api";
import { LoginRequest, LoginResponse, User } from "@/types/auth";

export const authApi = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
      const result = await apiClient.post<LoginResponse>('/auth/login', credentials);
      return LoginResponseSchema.parse(result.data);
    },
  
    async logout(): Promise<void> {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    },
  
    getCurrentUser(): User | null {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
  
    setAuth(token: string, user: User): void {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
  };
  