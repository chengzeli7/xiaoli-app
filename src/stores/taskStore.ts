import { create } from 'zustand';
import { db, type Task } from '../db';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  filterStatus: 'all' | 'todo' | 'in_progress' | 'completed';
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeTask: (id: number) => Promise<void>;
  setFilterStatus: (status: 'all' | 'todo' | 'in_progress' | 'completed') => void;
  getProgress: () => { total: number; completed: number; percentage: number };
  getTodayTasks: () => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  filterStatus: 'all',

  loadTasks: async () => {
    set({ loading: true });
    const tasks = await db.tasks.orderBy('createdAt').reverse().toArray();
    set({ tasks, loading: false });
  },

  addTask: async (task) => {
    await db.tasks.add(task as Task);
    await get().loadTasks();
  },

  updateTask: async (id, updates) => {
    await db.tasks.update(id, updates);
    await get().loadTasks();
  },

  deleteTask: async (id) => {
    await db.tasks.delete(id);
    await get().loadTasks();
  },

  completeTask: async (id) => {
    await db.tasks.update(id, {
      status: 'completed',
      completedAt: new Date()
    });
    await get().loadTasks();
  },

  setFilterStatus: (status) => set({ filterStatus: status }),

  getProgress: () => {
    const { tasks } = get();
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  },

  getTodayTasks: () => {
    const { tasks } = get();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
  },
}));