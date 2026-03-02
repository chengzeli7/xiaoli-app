import { useState } from 'react';
import { Input, TextArea } from '../common/Input';
import { Button } from '../common/Button';
import { useTaskStore } from '../../stores/taskStore';
import { type Task } from '../../db';

interface TaskFormProps {
  editingTask?: Task | null;
  onClose: () => void;
}

export function TaskForm({ editingTask, onClose }: TaskFormProps) {
  const { addTask, updateTask } = useTaskStore();
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState<1 | 2 | 3>(editingTask?.priority || 2);
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      if (editingTask?.id) {
        await updateTask(editingTask.id, {
          title,
          description,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
        });
      } else {
        await addTask({
          title,
          description,
          priority,
          dueDate: dueDate ? new Date(dueDate) : null,
          status: 'todo',
          createdAt: new Date(),
          completedAt: null,
        });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="任务标题"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="输入任务标题..."
        required
      />
      <TextArea
        label="任务描述（可选）"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="添加任务详情..."
        rows={3}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          优先级
        </label>
        <div className="flex gap-2">
          {[
            { value: 1, label: '低', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
            { value: 2, label: '中', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
            { value: 3, label: '高', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
          ].map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value as 1 | 2 | 3)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                priority === p.value
                  ? p.color + ' ring-2 ring-offset-2 ring-current'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <Input
        label="截止日期（可选）"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
          取消
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? '保存中...' : editingTask ? '更新' : '添加'}
        </Button>
      </div>
    </form>
  );
}