import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePicker } from '@/components/molecules/image-picker';
import { TagsInput } from '@/components/molecules/tags-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageFile, Region } from '@/types/common';
import { Category } from '@/types/common';
import MDEditor, { commands } from '@uiw/react-md-editor';

export interface ArticleFormProps {
  data: ArticleFormState;
  onChange: (field: string, value: any) => void;
  previewImageUrl?: string;
}

export interface ArticleFormState {
  title: string;
  imageFile: ImageFile;
  tags: string[];
  region: Region | undefined;
  category: Category | undefined;
  content: string;
}

const ArticleFormStateInitial = {
  title: "",
  imageFile: undefined,
  tags: [] as string[],
  region: undefined,
  category: "",
}


const ArticleForm = ({
  data,
  onChange,
}: ArticleFormProps) => {
  const { title, imageFile, tags, region, category, content } = data;
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter a compelling title"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label>Cover image</Label>
          <ImagePicker value={imageFile} onChange={(imageFile) => onChange('imageFile', imageFile)} ariaLabel="Upload cover image" />
          <p className="text-muted-foreground text-xs">
            PNG or JPG up to ~5MB. A preview will appear after you select an image.
          </p>
        </div>
        <div className="space-y-2 space-x-2">
          <div className="space-y-2 pb-8">
            <Label htmlFor="tags">Tags</Label>
            <TagsInput
              id="tags"
              value={tags}
              onChange={(value) => onChange('tags', value)}
              placeholder="Type a tag and press Enter"
            />
            <p className="text-muted-foreground text-xs">
              Add keywords to help people find your post.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={region} onValueChange={(v) => onChange('region', v as Region)}>
                <SelectTrigger aria-label="Select region">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Region).map((reg) => (
                    <SelectItem key={reg} value={reg}>
                      {reg.charAt(0).toUpperCase() + reg.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => onChange('category', v as Category)}>
                <SelectTrigger aria-label="Select category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <MDEditor
          value={content}
          onChange={(data) => onChange('content', data || '')}
          data-color-mode={'light'}
          height={'60dvh'}
          minHeight={300}
          overflow={false}
          commands={[
            commands.heading1,
            commands.heading2,
            commands.group(
              [commands.heading3, commands.heading4, commands.heading5, commands.heading6],
              {
                name: 'title',
                groupName: 'title',
                buttonProps: { 'aria-label': 'Insert title', title: 'Insert title' },
              }
            ),
            commands.divider,
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.divider,
            commands.link,
            commands.quote,
            commands.code,
            commands.codeBlock,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
            commands.divider,
            commands.table,
            commands.fullscreen,
          ]}
        />
      </div>
    </>
  );
};

export default ArticleForm;
