import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Edit2, Trash2, Check, Clock, AlertCircle } from 'lucide-react';
import { type Task } from '../../db';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const priorityConfig = {
  1: { label: '低', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  2: { label: '中', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  3: { label: '高', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
};

const statusConfig = {
  todo: { label: '待办', icon: Clock, color: 'text-gray-500' },
  in_progress: { label: '进行中', icon: AlertCircle, color: 'text-blue-500' },
  completed: { label: '已完成', icon: Check, color: 'text-green-500' },
};

export function TaskCard({ task, onEdit, onDelete, onComplete }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className="group">
      <div className="flex items-start gap-3">
        {task.status !== 'completed' && (
          <button
            onClick={onComplete}
            className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 hover:bg-orange-500 transition-all flex-shrink-0"
          />
        )}
        {task.status === 'completed' && (
          <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-medium text-gray-800 dark:text-white ${task.status === 'completed' ? 'line-through opacity-60' : ''}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${priority.bg} ${priority.color}`}>
              {priority.label}
            </span>
            <span className={`flex items-center gap-1 text-xs ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          {task.description && (
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p className={`mt-2 text-xs ${isOverdue ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
              截止：{format(new Date(task.dueDate), 'yyyy年MM月dd日', { locale: zhCN })}
              {isOverdue && ' (已逾期)'}
            </p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {task.status !== 'completed' && (
            <Button variant="ghost" size="sm" onClick={onComplete} title="完成">
              <Check className="w-4 h-4 text-green-500" />
            </Button>
          )}
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