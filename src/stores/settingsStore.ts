import { create } from 'zustand';
import { db } from '../db';

interface SettingsState {
  theme: 'light' | 'dark';
  loading: boolean;
  loadSettings: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  exportData: () => Promise<string>;
  importData: (data: string) => Promise<void>;
  clearData: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: 'light',
  loading: false,

  loadSettings: async () => {
    set({ loading: true });
    const settings = await db.settings.toArray();
    if (settings.length > 0) {
      set({ theme: settings[0].theme, loading: false });
    } else {
      await db.settings.add({ theme: 'light' });
      set({ theme: 'light', loading: false });
    }
  },

  toggleTheme: async () => {
    const { theme } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const settings = await db.settings.toArray();
    if (settings.length > 0) {
      await db.settings.update(settings[0].id!, { theme: newTheme });
    }
    set({ theme: newTheme });
  },

  exportData: async () => {
    const inspirations = await db.inspirations.toArray();
    const tasks = await db.tasks.toArray();
    const tags = await db.tags.toArray();
    const data = { inspirations, tasks, tags, exportedAt: new Date().toISOString() };
    return JSON.stringify(data, null, 2);
  },

  importData: async (dataStr) => {
    try {
      const data = JSON.parse(dataStr);
      if (data.inspirations) await db.inspirations.bulkPut(data.inspirations);
      if (data.tasks) await db.tasks.bulkPut(data.tasks);
      if (data.tags) await db.tags.bulkPut(data.tags);
    } catch (e) {
      console.error('Import failed:', e);
      throw new Error('数据格式不正确');
    }
  },

  clearData: async () => {
    await db.inspirations.clear();
    await db.tasks.clear();
    await db.tags.clear();
  },
}));