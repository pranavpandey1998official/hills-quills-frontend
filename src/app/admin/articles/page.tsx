'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useArticles } from '@/features/article/hooks';
import { useArticleFilterHook } from '@/features/article/hooks/useArticleFilterHook';
import { useRouter } from 'next/navigation';
import { Plus} from 'lucide-react';
import { ArticlesTable } from '../../../features/article/component/articles-table';
import Filter from '@/components/molecules/filter';
import Loading from '@/components/molecules/loading';

export default function ArticlesPage() {
  const router = useRouter();
  const { articles, error, isLoading } = useArticles();
  const {
    filteredArticles,
    searchTerm,
    statusFilter,
    categoryFilter,
    regionFilter,
    setSearchTerm,
    setStatusFilter,
    setCategoryFilter,
    setRegionFilter,
  } = useArticleFilterHook(articles);

  const handleCreateNew = () => {
    router.push('/admin/articles/create');
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Articles Management</h1>
          <p className="text-muted-foreground">
            Manage and review all articles. Total: {filteredArticles.length} articles
          </p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Article
        </Button>
      </div>

      {/* Filters */}
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />

      {/* Articles Table */}
      <ArticlesTable articles={filteredArticles} isLoading={isLoading} />
    </div>
  );
}
