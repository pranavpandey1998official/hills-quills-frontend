'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useArticles } from '../hooks/article';
import { useFilterHook } from '../hooks/useFilterHook';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter } from 'lucide-react';
import { ArticleStatus } from '@/types/articles';
import { ArticlesTable } from './components/ArticlesTable';

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
  } = useFilterHook(articles);
  const uniqueCategories = useMemo(
    () => [...new Set(articles?.map((article) => article.category))],
    [articles]
  );
  const uniqueRegions = useMemo(
    () => [...new Set(articles?.map((article) => article.region))],
    [articles]
  );

  const handleCreateNew = () => {
    router.push('/admin/articles/create');
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
      <div className="bg-muted/30 flex flex-col gap-4 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value={ArticleStatus.Draft}>Draft</SelectItem>
              <SelectItem value={ArticleStatus.Pending}>Pending</SelectItem>
              <SelectItem value={ArticleStatus.Approved}>Approved</SelectItem>
              <SelectItem value={ArticleStatus.Rejected}>Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Region Filter */}
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Articles Table */}
      <ArticlesTable articles={filteredArticles} isLoading={isLoading} />
    </div>
  );
}
