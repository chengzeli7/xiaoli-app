import { useTaskStore } from '../../stores/taskStore';
import { TaskCard } from './TaskCard';
import { Button } from '../common/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../common/Modal';
import { TaskForm } from './TaskForm';
import { type Task } from '../../db';

interface TaskListProps {
  onAddNew: () => void;
}

export function TaskList({ onAddNew }: TaskListProps) {
  const { tasks, filterStatus, setFilterStatus, deleteTask, completeTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filterOptions: { value: typeof filterStatus; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'todo', label: '待办' },
    { value: 'in_progress', label: '进行中' },
    { value: 'completed', label: '已完成' },
  ];

  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter(task => task.status === filterStatus);

  const handleDelete = async (id: number) => {
    if (confirm('确定要删除这个任务吗？')) {
      await deleteTask(id);
    }
  };

  const handleComplete = async (id: number) => {
    await completeTask(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Button onClick={onAddNew}>
          <Plus className="w-4 h-4 mr-1.5" />
          添加任务
        </Button>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                filterStatus === option.value
                  ? 'bg-white dark:bg-gray-700 text-orange-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <p className="text-lg">还没有任务</p>
          <p className="text-sm mt-1">点击上方按钮添加你的第一个任务</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={() => handleDelete(task.id!)}
              onComplete={() => handleComplete(task.id!)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="编辑任务"
      >
        {editingTask && (
          <TaskForm
            editingTask={editingTask}
            onClose={() => setEditingTask(null)}
          />
        )}
      </Modal>
    </div>
  );
}