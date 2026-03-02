import { create } from 'zustand';
import { db, type Inspiration } from '../db';

interface InspirationState {
  inspirations: Inspiration[];
  loading: boolean;
  selectedTag: string | null;
  loadInspirations: () => Promise<void>;
  addInspiration: (inspiration: Omit<Inspiration, 'id'>) => Promise<void>;
  updateInspiration: (id: number, updates: Partial<Inspiration>) => Promise<void>;
  deleteInspiration: (id: number) => Promise<void>;
  setSelectedTag: (tag: string | null) => void;
  getAllTags: () => string[];
}

export const useInspirationStore = create<InspirationState>((set, get) => ({
  inspirations: [],
  loading: false,
  selectedTag: null,

  loadInspirations: async () => {
    set({ loading: true });
    const inspirations = await db.inspirations.orderBy('createdAt').reverse().toArray();
    set({ inspirations, loading: false });
  },

  addInspiration: async (inspiration) => {
    await db.inspirations.add(inspiration as Inspiration);
    await get().loadInspirations();
  },

  updateInspiration: async (id, updates) => {
    await db.inspirations.update(id, updates);
    await get().loadInspirations();
  },

  deleteInspiration: async (id) => {
    await db.inspirations.delete(id);
    await get().loadInspirations();
  },

  setSelectedTag: (tag) => set({ selectedTag: tag }),

  getAllTags: () => {
    const { inspirations } = get();
    const tagSet = new Set<string>();
    inspirations.forEach(insp => {
      insp.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  },
}));