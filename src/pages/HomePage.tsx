import { useEffect, useState } from 'react';
import { useInspirationStore } from '../stores/inspirationStore';
import { useTaskStore } from '../stores/taskStore';
import { Card } from '../components/common/Card';
import { XiaoliChat } from '../components/xiaoli/XiaoliChat';
import { Lightbulb, CheckSquare, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function HomePage() {
  const { inspirations, loadInspirations } = useInspirationStore();
  const { tasks, loadTasks, getProgress } = useTaskStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadInspirations();
    loadTasks();
    setMounted(true);
  }, []);

  const progress = getProgress();
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    const today = new Date();
    const due = new Date(task.dueDate);
    return due.toDateString() === today.toDateString();
  });

  const stats = [
    {
      label: '灵感总数',
      value: inspirations.length,
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    {
      label: '任务总数',
      value: tasks.length,
      icon: CheckSquare,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      label: '完成进度',
      value: `${progress.percentage}%`,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      label: '今日待办',
      value: todayTasks.length,
      icon: Calendar,
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            欢迎回来！👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {format(new Date(), 'yyyy年MM月dd日 EEEE', { locale: zhCN })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className={`transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            小梨有话说
          </h3>
          <XiaoliChat />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            今日待办
          </h3>
          {todayTasks.length > 0 ? (
            <div className="space-y-2">
              {todayTasks.map(task => (
                <Card key={task.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-gray-700 dark:text-gray-300 flex-1 truncate">
                    {task.title}
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-gray-400 dark:text-gray-500 text-center py-8">
                今天没有待办任务啦！🎉
              </p>
            </Card>
          )}
        </div>
      </div>

      {inspirations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            最近灵感
          </h3>
          <div className="space-y-2">
            {inspirations.slice(0, 3).map(insp => (
              <Card key={insp.id}>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{insp.content}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}