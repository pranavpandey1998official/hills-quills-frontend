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
  isAdmin: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

//useAuth type

export enum UserRole {
  ADMIN = "admin",
  AUTHOR = "author",
  UNKNOWN = "unknown",
}

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

//protected route props
export type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};