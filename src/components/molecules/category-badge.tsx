import { Badge } from '../ui/badge';
import { Category } from '@/types/common';
import Link from 'next/link';

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <Link href={`/category/${category}`} prefetch={false}>
      <Badge
        variant="secondary"
        className="text-2xs rounded-sm bg-slate-400 px-2 py-1 font-medium text-white hover:bg-slate-600"
      >
        {category.toLocaleUpperCase()}
      </Badge>
    </Link>
  );
}
