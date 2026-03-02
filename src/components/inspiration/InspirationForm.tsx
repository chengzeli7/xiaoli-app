import { useState } from 'react';
import { Input, TextArea } from '../common/Input';
import { Button } from '../common/Button';
import { useInspirationStore } from '../../stores/inspirationStore';
import { type Inspiration } from '../../db';

interface InspirationFormProps {
  editingInspiration?: Inspiration | null;
  onClose: () => void;
}

export function InspirationForm({ editingInspiration, onClose }: InspirationFormProps) {
  const { addInspiration, updateInspiration } = useInspirationStore();
  const [content, setContent] = useState(editingInspiration?.content || '');
  const [source, setSource] = useState(editingInspiration?.source || '');
  const [tagsInput, setTagsInput] = useState(editingInspiration?.tags?.join(', ') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    try {
      if (editingInspiration?.id) {
        await updateInspiration(editingInspiration.id, {
          content,
          source,
          tags,
        });
      } else {
        await addInspiration({
          content,
          source,
          tags,
          createdAt: new Date(),
        });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextArea
        label="灵感内容"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="记录你的灵感和想法..."
        rows={4}
        required
      />
      <Input
        label="来源（可选）"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="例如：阅读、对话、梦境..."
      />
      <Input
        label="标签（用逗号分隔）"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="例如：创意, 工作, 生活"
      />
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
          取消
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? '保存中...' : editingInspiration ? '更新' : '添加'}
        </Button>
      </div>
    </form>
  );
}