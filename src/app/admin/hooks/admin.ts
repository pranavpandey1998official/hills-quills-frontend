import { fetchAdmin } from "@/services/admin";
import { Admin } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import { fetchAllArticles } from "@/services/article";
import { fetchAllAuthors } from "@/services/author";
import { Story } from "@/redux/slices/storiesSlice";

export function useAdmin() {
  const { data: admin, error, isLoading } = useQuery<Admin>({
    queryKey: ["admin"] as const,
    queryFn: fetchAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  return { admin, error, isLoading };
}

export function useAuthors() {
  const { data: authors, error, isLoading } = useQuery({
    queryKey: ["allAuthors"] as const,
    queryFn: () => fetchAllAuthors(10000, 10), // Placeholder function
  })
  return { authors, error, isLoading };
}

export function useWebStories() {
  // TODO
  // Placeholder for fetching web stories from Redux or API
  // For now, we'll assume it's fetched from Redux
  return { webStories: [] as Story[], error:  null, isLoading:  false };
}