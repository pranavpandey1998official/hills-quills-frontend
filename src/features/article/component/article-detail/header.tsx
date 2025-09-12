import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Link, Share2 } from 'lucide-react';
import { ArticleViewWithAuthor } from '@/features/article/types';
import CategoryBadge from '../../../../components/molecules/category-badge';
import RegionBadge from '../../../../components/molecules/region-badge';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import Image from 'next/image';

const ArticleDetailHeader = ({article}: {article: ArticleViewWithAuthor}) => {

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  }
  return (
    <div className="bg-white overflow-hidden">
      <div className="flex gap-2 py-6 pb-4">
        <CategoryBadge category={article.category} />
        <RegionBadge region={article.region} />
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>
      </div>

      {/* Article Meta */}
      <div className=" mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-500">
          <span className="text-sm">By {article.author_name}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleCopyLink} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Link className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Copy Link</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <div className="aspect-video w-full relative overflow-hidden">
          
          {/* Tree silhouettes using CSS */}
          <Image src={article.image.previewUrl} alt={article.title} fill className="object-cover object-center"/>
          
        </div>
        
        {/* Photo Credit */}
        <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
          Photo: Hills & Quills
        </div>
      </div>

      {/* Tags at bottom */}
    </div>
  );
};

export default ArticleDetailHeader;