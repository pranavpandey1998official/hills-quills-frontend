'use client';

import { AuthProvider } from '@/features/auth/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60, // 1 hour
            // staleTime: 0,           // (optional) how long data is considered fresh
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Provider;
