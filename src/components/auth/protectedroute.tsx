'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {ProtectedRouteProps, UserRole} from '@/types/auth';




export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login page
      if (!user) {
        router.push(requiredRole === 'admin' ? '/login/admin' : '/login/author');
        return;
      }

      // If a role is required and user doesn't have it, redirect to appropriate dashboard
      if (requiredRole && user.role !== requiredRole) {
        router.push(user.role === 'admin' ? '/admin/dashboard' : '/author/dashboard');
      }
    }
  }, [user, isLoading, requiredRole, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Don't render anything if user is not authenticated
  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Redirecting to login...</div>;
  }

  // If role checking is required and user doesn't have the right role, don't render children
  if (requiredRole && user.role !== requiredRole) {
    return <div className="flex justify-center items-center min-h-screen">Unauthorized access</div>;
  }

  // User is authenticated and has the correct role
  return <>{children}</>;
}