import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Edit2, Trash2, Tag } from 'lucide-react';
import { type Inspiration } from '../../db';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface InspirationCardProps {
  inspiration: Inspiration;
  onEdit: () => void;
  onDelete: () => void;
}

export function InspirationCard({ inspiration, onEdit, onDelete }: InspirationCardProps) {
  return (
    <Card className="group">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">
            {inspiration.content}
          </p>
          {inspiration.source && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              来源：{inspiration.source}
            </p>
          )}
          {inspiration.tags && inspiration.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {inspiration.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(inspiration.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
          </p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
}