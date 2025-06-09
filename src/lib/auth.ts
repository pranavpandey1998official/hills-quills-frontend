import { apiClient } from "./api";
import { LoginRequest, LoginResponse, User } from "@/types/auth";

export const authApi = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
      return apiClient.post<LoginResponse>('/auth/login', credentials);
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
  