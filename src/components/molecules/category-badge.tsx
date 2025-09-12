import { Badge } from '../ui/badge';
import { Category } from '@/types/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CategoryBadge({ category }: { category: Category }) {
  const router = useRouter();
  return (
    <Badge
      onClick={() => {
        router.push(`/category/${category}`);
      }}
      variant="secondary"
      className="text-2xs bg-secondary hover:bg-secondary-dark rounded-sm px-2 py-1 font-medium text-white"
    >
      {category.toLocaleUpperCase()}
    </Badge>
  );
}
