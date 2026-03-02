import { useTaskStore } from '../../stores/taskStore';
import { Card } from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function ProgressTracker() {
  const { tasks, getProgress } = useTaskStore();
  const progress = getProgress();

  const statusData = [
    { name: '已完成', value: tasks.filter(t => t.status === 'completed').length, color: '#22c55e' },
    { name: '进行中', value: tasks.filter(t => t.status === 'in_progress').length, color: '#3b82f6' },
    { name: '待办', value: tasks.filter(t => t.status === 'todo').length, color: '#f59e0b' },
  ].filter(d => d.value > 0);

  const priorityData = [
    { name: '高', value: tasks.filter(t => t.priority === 3).length, color: '#ef4444' },
    { name: '中', value: tasks.filter(t => t.priority === 2).length, color: '#f59e0b' },
    { name: '低', value: tasks.filter(t => t.priority === 1).length, color: '#22c55e' },
  ];

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const recentCompleted = completedTasks.slice(-7);

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">总体进度</h3>
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: '完成', value: progress.completed },
                    { name: '未完成', value: progress.total - progress.completed },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={55}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#22c55e" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">{progress.percentage}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">总任务数</span>
              <span className="font-semibold text-gray-800 dark:text-white">{progress.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-600">已完成</span>
              <span className="font-semibold text-green-600">{progress.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-600">进行中</span>
              <span className="font-semibold text-amber-600">{tasks.filter(t => t.status === 'in_progress').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">待办</span>
              <span className="font-semibold text-gray-800 dark:text-white">{tasks.filter(t => t.status === 'todo').length}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">任务状态分布</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400">暂无数据</div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">优先级分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priorityData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={30} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {priorityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {recentCompleted.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">最近完成</h3>
          <div className="space-y-2">
            {recentCompleted.map(task => (
              <div key={task.id} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400 flex-1 truncate">{task.title}</span>
                {task.completedAt && (
                  <span className="text-gray-400 text-xs">
                    {new Date(task.completedAt).toLocaleDateString('zh-CN')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}