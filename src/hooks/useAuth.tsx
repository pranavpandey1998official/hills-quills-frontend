'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, User, LoginCredentials, AuthContextType } from '@/types/auth';
import { API_BASE_URL } from '@/types/constant';

// Update API_BASE_URL to point to port 3000 where backend is running


// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  authenticatedFetch: async () => new Response(),
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to check if a JWT token is expired
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
      console.error('Error checking token expiration:', error);
      return true; // If we can't validate, assume expired for security
    }
  };

  // Function to validate the current token
  const validateToken = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    
    // Check if token is expired
    if (isTokenExpired(token)) {
      // Token expired, logout user
      logout();
      return false;
    }
    
    return true;
  };

  // Load user data on component mount with token validation
  useEffect(() => {
    const loadUserFromStorage = () => {
      // Check if we have token in localStorage (client side only)
      if (typeof window !== 'undefined') {
        try {
          const token = localStorage.getItem('auth_token');
          const storedUser = localStorage.getItem('user');

          if (token && storedUser) {
            // Validate token expiration
            if (!isTokenExpired(token)) {
              setUser(JSON.parse(storedUser));
            } else {
              console.log('Token expired, logging out');
              logout(); // Automatically logout if token is expired
            }
          }
        } catch (error) {
          console.error('Error loading user data from storage', error);
          logout(); // Safety: logout on error
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Authenticated fetch utility that handles token validation
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    // First validate token
    if (!validateToken()) {
      throw new Error('Authentication required');
    }
    
    const token = localStorage.getItem('auth_token');
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    // Handle 401/403 responses (token rejected by server)
    if (response.status === 401 || response.status === 403) {
      console.log('Token rejected by server, logging out');
      logout();
      throw new Error('Authentication failed');
    }
    
    return response;
  };

  // Login function that calls the appropriate backend endpoint
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    console.log('Login attempt with:', credentials.email, credentials.userType);
    try {
      const endpoint = credentials.userType === 'admin'
        ? `${API_BASE_URL}/auth/admin/login`
        : `${API_BASE_URL}/auth/authors/login`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      console.log('Login response:', response);
      const responseData = await response.json(); // { success, message, data: { id, name/username, email, token, ... }, timestamp }
      console.log('Login response data:', responseData);
      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || responseData.error || 'Login failed');
      }

      // API data is nested in responseData.data
      const apiData = responseData.data;
      console.log('Login API response data:', apiData);
      if (!apiData || !apiData.token) {
        console.error('Login API response missing data object or token:', responseData);
        throw new Error('Incomplete data from login API.');
      }
      console.log('Login API response data:', apiData);
      const authToken = apiData.token; // This is the access token
      console.log('Login API response data:', apiData);
      // Construct the full User object for frontend state
      const loggedInUser: User = {
        id: String(apiData.id), // Assuming id from API might be a number
        email: apiData.email,
        name: apiData.name || apiData.username, // Use name for author, username for admin
        role: credentials.userType,             // Manually add the role
        token: authToken,                       // Store the access token in the user object
        // Add other fields from apiData if they are part of your User type
        about: apiData.about, 
        profession: apiData.profession,
        profile_photo_url: apiData.profile_photo_url,
      };

      setUser(loggedInUser);

      if (typeof window !== 'undefined') {
        console.log('Login API response data:', apiData);       
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        localStorage.setItem('auth_token', authToken); // Store the access token separately as well
      }

    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      // Don't throw the error, just log it
      console.error(errorMessage);
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
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        authenticatedFetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);