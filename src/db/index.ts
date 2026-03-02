import Dexie, { type Table } from 'dexie';

export interface Inspiration {
  id?: number;
  content: string;
  source: string;
  tags: string[];
  createdAt: Date;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  dueDate: Date | null;
  status: 'todo' | 'in_progress' | 'completed';
  createdAt: Date;
  completedAt: Date | null;
}

export interface Tag {
  id?: number;
  name: string;
}

export interface AppSettings {
  id?: number;
  theme: 'light' | 'dark';
}

class XiaoliDB extends Dexie {
  inspirations!: Table<Inspiration>;
  tasks!: Table<Task>;
  tags!: Table<Tag>;
  settings!: Table<AppSettings>;

  constructor() {
    super('xiaoli-db');
    this.version(1).stores({
      inspirations: '++id, content, source, createdAt, *tags',
      tasks: '++id, title, description, priority, dueDate, status, createdAt, completedAt',
      tags: '++id, name',
      settings: '++id, theme'
    });
  }
}

export const db = new XiaoliDB();

export async function initializeDB() {
  const settingsCount = await db.settings.count();
  if (settingsCount === 0) {
    await db.settings.add({ theme: 'light' });
  }
}