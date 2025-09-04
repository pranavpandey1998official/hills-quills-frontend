'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, LoginCredentials } from '@/types/auth';
import { API_BASE_URL } from '@/types/constant';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loginAdmin, refreshAdminToken } from '@/services/admin';
import { loginAuthor, refreshAuthorToken } from '@/services/author';
import { Admin } from '@/types/admin';
import { Author } from '@/types/author';
import { LoginResponse } from '@/types/common';

// Update API_BASE_URL to point to port 3000 where backend is running

export type AuthContextType = {
  user: User
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

class User {
  role: UserRole;
  refresh_token: string;
  token: string;

  constructor(role: UserRole, refresh_token: string = '', token: string = '') {
    this.refresh_token = refresh_token;
    this.token = token;
    this.role = role;
  }
}

class AdminUser extends User {
  id: number;
  adminRole: string;
  email: string;

  constructor(data: LoginResponse & Admin) {
    super(UserRole.ADMIN, data.refresh_token, data.token);
    this.id = data.id;
    this.adminRole = data.role;
    this.email = data.email;
  }
}

class AuthorUser extends User {
  id: number;
  name: string;
  email: string;
  about?: string;
  profession?: string;
  profile_photo_url?: string;

  constructor(data: LoginResponse & Author) {
    super(UserRole.AUTHOR, data.refresh_token, data.token);
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.about = data.about;
    this.profession = data.profession;
    this.profile_photo_url = data.profile_photo_url;
  }
}

class UnknownUser extends User {
  constructor() {
    super(UserRole.UNKNOWN);
  }
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  user: new UnknownUser(),
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

const isTokenExpired = (token: string): boolean => {
  try {
    // Extract payload from JWT (second part of token)
    const payload = token.split('.')[1];
    if (!payload) return true;
    
    // Decode base64
    const decoded = JSON.parse(atob(payload));
    const expiry = decoded.exp * 1000; // Convert to milliseconds
    
    return Date.now() >= expiry;
  } catch (error) {
    return true; // If we can't validate, assume expired for security
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(new UnknownUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshToken(user: User) {
    setIsLoading(true);
    setError(null);
    try {
      if (user.role === UserRole.ADMIN) {
        const loginUser = await refreshAdminToken(user.refresh_token)
      }
      else if (user.role === UserRole.AUTHOR) {
        const loginUser = await refreshAuthorToken(user.refresh_token)
      }
    } catch (err) {
      logout(); // On refresh failure, logout
    } finally {
      setIsLoading(false);
    }
  }

  function setLoginUser(user : User) {
    if (typeof window !== 'undefined') {    
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth_token', user.token); // Store the access token separately as well
    }
    setUser(user);
  }

  // Login function that calls the appropriate backend endpoint
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {

      if (credentials.userType === UserRole.ADMIN) {
        const result = await loginAdmin(credentials.email, credentials.password)
        setLoginUser(new AdminUser(result));
      } else if (credentials.userType === UserRole.AUTHOR) {
        const result = await loginAuthor(credentials.email, credentials.password); // Call the appropriate login function based on userType
        setLoginUser(new AuthorUser(result));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear auth data from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    setUser(new UnknownUser());
    setError(null);
  };
    

  // Load user data on component mount with token validation
  useEffect(() => {
    const loadUserFromStorage = async () => {
      // Check if we have token in localStorage (client side only)
      if (typeof window === "undefined") {
        setIsLoading(false);
        return;
      }
  
      try {
        const token = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("user");
        
        if (!token || !storedUser) {
          logout();
          return;
        }
  
        const user = JSON.parse(storedUser);
  
        if (isTokenExpired(token)) {
          await refreshToken(user);
        } else {
          setUser(user);
        }
      } catch (error) {
        logout(); // fallback on any error
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);


  const queryClient = new QueryClient();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout
      }}
    >
      <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
