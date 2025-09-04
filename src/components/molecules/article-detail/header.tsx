import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Link, Share2 } from 'lucide-react';
import { ArticleViewWithAuthor, Category, Region } from '@/types/articles';
import CategoryBadge from '../category-badge';
import RegionBadge from '../region-badge';
import { Article } from '@/types/articles';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import Image from 'next/image';

const ArticleDetailHeader = ({article}: {article: ArticleViewWithAuthor}) => {

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  }
  return (
    <article className="bg-white overflow-hidden">
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
        <div className="aspect-video w-full bg-gradient-to-b from-gray-100 to-gray-300 relative overflow-hidden">
          {/* Simulated forest image using CSS gradients and pseudo-elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-400"></div>
          
          {/* Tree silhouettes using CSS */}
          <Image src={article.image} alt={article.title} fill className="object-cover object-center"/>
          
          {/* Fog effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
        </div>
        
        {/* Photo Credit */}
        <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
          Photo: Hills & Quills
        </div>
      </div>

      {/* Tags at bottom */}
    </article>
  );
};

export default ArticleDetailHeader;