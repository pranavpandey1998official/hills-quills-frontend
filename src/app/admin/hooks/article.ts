import { apiClient } from '@/lib/api';
import {
  createArticle,
  updateArticle,
  fetchArticleById,
  fetchAllArticles,
  updateArticleStatus,
  deleteArticle,
  fetchTagsForArticle,
  fetchArticleByIdForView,
} from '@/services/article';
import { Article, ArticleStatus, Category, Region } from '@/types/articles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { toast } from 'sonner';
import { ArticleUpdates } from '@/types/articles';

export function useCreateArticle() {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: ({
      title,
      content,
      authorId,
      tags,
      status,
      category,
      region,
      imageUrl,
    }: {
      title: string;
      content: string;
      authorId: number;
      tags: string[];
      status: string;
      category: string;
      region: string;
      imageUrl: string;
    }) => createArticle(title, content, authorId, tags, status, category, region, imageUrl),
    onSuccess: (data) => {
      queryClient.setQueryData(['allArticle'], (oldData: Article[]) => {
        return [data, ...oldData];
      });
    }
  });

  const articleCreate = useCallback(
    async (
      title: string,
      content: string,
      authorId: number,
      tags: string[],
      status: ArticleStatus,
      category: Category,
      region: Region,
      image: File
    ) => {
      setIsLoading(true);

      try {
        // Upload the image first
        const uploadResponse = await apiClient.uploadImage(image);
        const imageUrl = uploadResponse.data.url;
        await mutateAsync({ title, content, authorId, tags, status, category, region, imageUrl });
      } catch (err: any) {
        setIsLoading(false);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },    
    [mutateAsync]
  );
  return [articleCreate, isLoading,] as const;
}

export function useArticles() {
  var {
    data: articles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['allArticle'],
    queryFn: () => fetchAllArticles(10000, 10),
  });
  if (!articles) {
    articles = [];
  }
  return { articles, error, isLoading };
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      id,
      title,
      content,
      tags,
      category,
      region,
      imageUrl,
    }: {
      id: number;
      title?: string;
      content?: string;
      tags?: string[];
      category?: string;
      region?: string;
      imageUrl?: string;
    }) => updateArticle(id, title, content, tags, category, region, imageUrl),
    onSuccess: (data) => {
      queryClient.setQueryData(['allArticle'], (oldData: Article[]) => {
        return oldData.map((article) => {
          if (article.id === data.id) {
            return data;
          }
          return article;
        });
      });
    },
  });

  const articleUpdate = useCallback(
    async (id: number, updates: ArticleUpdates) => {
      if (updates.imageFile) {
          const uploadResponse = await apiClient.uploadImage(updates.imageFile);
          const imageUrl = uploadResponse.data.url;
          await mutateAsync({
            id,
            title: updates.title,
            content: updates.content,
            tags: updates.tags,
            category: updates.category,
            region: updates.region,
            imageUrl,
          });
      } else {
        await mutateAsync({
          id,
          title: updates.title,
          content: updates.content,
          tags: updates.tags,
          category: updates.category,
          region: updates.region,
        });
      }
    },
    [mutateAsync]
  );

  return { updateArticle: articleUpdate, isLoading: isPending };
}

export function useUpdateArticleStatus() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      id,
      status,
      rejectionReason,
    }: {
      id: number;
      status: ArticleStatus;
      rejectionReason?: string;
    }) => updateArticleStatus(id, status, rejectionReason),
    onSuccess: (newArticle: Article) => {
      queryClient.setQueryData(['allArticle'], (oldData: Article[]) => {
        if (!oldData) return [];
        return oldData.map((article) => {
          if (article.id === newArticle.id) {
            return newArticle;
          }
          return article;
        });
      });
    },
  });

  return { updateArticleStatus: mutateAsync, isLoading: isPending };
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (id: number) => deleteArticle(id),
    onSuccess: (deleteArticle: Article) => {
      queryClient.setQueryData(['allArticle'], (oldData: Article[]) => {
        return oldData.filter((article) => article.id !== deleteArticle.id);
      });
    },
  });

  return { deleteArticle: mutateAsync, isLoading: isPending, error };
}

export function useArticleById(id: number) {
  const {
    data: article,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticleByIdForView(id),
    enabled: !!id,
  });
  return { article, error, isLoading };
}

export function useTagsForArticle(id?: number) {
  const {
    data: tags,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['tags', id],
    queryFn: () => fetchTagsForArticle(id as number),
    enabled: !!id,
    staleTime: 5* 1000, // 5 seconds
  });

  return { tags: tags ?? [], error, isLoading };
}
