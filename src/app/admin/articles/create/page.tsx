'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

import { Save } from 'lucide-react';
import ArticleForm from '../components/ArticleForm';
import { useCreateArticleForm } from '../../hooks/useCreateArticle';


export default function BlogCreateForm() {
  const { formData, handleChange, handleReset, handlePublish, handleSaveDraft, isCreating } = useCreateArticleForm()

  return (
    <>
      <div className="space-y-6">
        <ArticleForm
          data={formData}
          onChange={handleChange}
        />

        <div className="flex items-left  gap-3">
          <Button onClick={handlePublish} disabled={isCreating}>
            {isCreating ? 'Publishing...' : 'Publish'}
          </Button>
          <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={isCreating}>
              <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isCreating}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}
