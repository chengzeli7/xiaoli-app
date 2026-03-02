import { useInspirationStore } from '../../stores/inspirationStore';
import { InspirationCard } from './InspirationCard';
import { Button } from '../common/Button';
import { Plus, Filter } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../common/Modal';
import { InspirationForm } from './InspirationForm';
import { type Inspiration } from '../../db';

interface InspirationListProps {
  onAddNew: () => void;
}

export function InspirationList({ onAddNew }: InspirationListProps) {
  const { inspirations, selectedTag, setSelectedTag, getAllTags, deleteInspiration } = useInspirationStore();
  const [editingInspiration, setEditingInspiration] = useState<Inspiration | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const allTags = getAllTags();
  const filteredInspirations = selectedTag
    ? inspirations.filter(insp => insp.tags?.includes(selectedTag))
    : inspirations;

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这条灵感吗？')) {
      await deleteInspiration(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Button onClick={onAddNew}>
          <Plus className="w-4 h-4 mr-1.5" />
          添加灵感
        </Button>
        {allTags.length > 0 && (
          <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
            <Filter className="w-4 h-4 mr-1.5" />
            筛选 {selectedTag && `(${selectedTag})`}
          </Button>
        )}
      </div>

      {showFilter && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              !selectedTag
                ? 'bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            全部
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                selectedTag === tag
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filteredInspirations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-lg">还没有灵感记录</p>
          <p className="text-sm mt-1">点击上方按钮添加你的第一个灵感</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredInspirations.map(inspiration => (
            <InspirationCard
              key={inspiration.id}
              inspiration={inspiration}
              onEdit={() => setEditingInspiration(inspiration)}
              onDelete={() => handleDelete(inspiration.id!)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!editingInspiration}
        onClose={() => setEditingInspiration(null)}
        title="编辑灵感"
      >
        {editingInspiration && (
          <InspirationForm
            editingInspiration={editingInspiration}
            onClose={() => setEditingInspiration(null)}
          />
        )}
      </Modal>
    </div>
  );
}