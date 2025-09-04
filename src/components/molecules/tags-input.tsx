import { cn } from '@/lib/utils';
import React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type Props = {
    id: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function TagsInput({ id, value, onChange, placeholder = 'Type a tag and press enter', className }: Props) {
    const [draft, setDraft] = React.useState('');
  
    function addTag(tag: string) {
      const cleaned = tag.trim().toLowerCase();
      if (!cleaned) return;
      if (value.includes(cleaned)) return;
      onChange([...value, cleaned]);
      setDraft('');
    }
  
    function removeTag(tag: string) {
      onChange(value.filter((t) => t !== tag));
    }
  
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(draft);
      } else if (e.key === 'Backspace' && draft.length === 0 && value.length > 0) {
        onChange(value.slice(0, -1));
      }
    }
  
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {id ? (
          <Label htmlFor={id} className="sr-only">
            Tags
          </Label>
        ) : null}
        <div className="flex items-center gap-2">
          <Input
            id={id}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
          <Button type="button" variant="secondary" onClick={() => addTag(draft)}>
            Add
          </Button>
        </div>
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                <span>#{tag}</span>
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  onClick={() => removeTag(tag)}
                  className="inline-flex"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }