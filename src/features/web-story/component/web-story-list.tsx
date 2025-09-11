import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Story } from '@/features/web-story/types';
import Link from 'next/link';

export interface WebStoryListProps {
  stories?: Story[];
  onStoryClick: (story: Story) => void;
}

const WebStoryList = ({
  stories,
  onStoryClick,
}: WebStoryListProps): React.ReactNode => {
  if (!stories) {
    return null;
  }
  return (
    <div className="scrollbar-hide w-full overflow-x-auto pb-4">
      <div className="flex min-w-max space-x-4">
        {stories.map((story) => (
          <Link href={`/web-stories/${story.id}`} key={story.id}>
            <div
              key={story.id}
              className="group relative h-96 w-48 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => onStoryClick(story)}
            >
              <Image
                src={story.cover_image_url.previewUrl}
                alt={story.title}
                fill
                sizes="(max-width: 640px) 50vw, 192px"
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-125"
              />
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-5">
                <h3 className="line-clamp-2 font-serif text-base leading-tight text-white">
                  {story.title}
                </h3>
                <p className="mt-1 font-sans text-xs text-white/70">
                  {story.category} • {story.region}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebStoryList;
