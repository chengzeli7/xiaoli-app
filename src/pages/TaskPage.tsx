import { useEffect, useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { TaskList } from '../components/task/TaskList';
import { ProgressTracker } from '../components/task/ProgressTracker';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/task/TaskForm';
import { BarChart3 } from 'lucide-react';

export function TaskPage() {
  const { loadTasks } = useTaskStore();
  const [showForm, setShowForm] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">任务管理</h2>
        <button
          onClick={() => setShowProgress(!showProgress)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showProgress
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          {showProgress ? '隐藏统计' : '查看统计'}
        </button>
      </div>

      {showProgress ? (
        <ProgressTracker />
      ) : (
        <TaskList onAddNew={() => setShowForm(true)} />
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="添加任务">
        <TaskForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}