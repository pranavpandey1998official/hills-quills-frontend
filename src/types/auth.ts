   export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

//loginparams
export type LoginFormProps = {
  userType: "admin" | "author"
}

//useAuth type

export type UserRole = 'admin' | 'author';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  token: string;
  about?: string;
  profession?: string;
  profile_photo_url?: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
  userType: UserRole;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
};

//protected route props
export type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};