import { create } from 'zustand';

interface FavoritesState {
  ids: Record<string, true>;
  toggle: (id: string) => void;
  clear: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  ids: {},
  toggle: (id) =>
    set((state) => {
      const next = { ...state.ids };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return { ids: next };
    }),
  clear: () => set({ ids: {} }),
}));

// --- Imperative helper -------------------------------------------------------
// This doesn't subscribe — it reads/writes the store from outside a
// component. Useful in event handlers, analytics, background work, or any
// non-React caller where you don't want a re-render.

export function toggleFavorite(id: string): void {
  useFavoritesStore.getState().toggle(id);
}
