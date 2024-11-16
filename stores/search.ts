import { Character } from "@/types/character";
import { create } from "zustand";

interface SearchStore {
  selectedItems: Record<string, Character>
  query: string
  setQuery: (query: string) => void

  toggleItem: (id: string, character: Character) => void
  addItem: (id: string, character: Character) => void
  removeItem: (id: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  selectedItems: {},
  query: "",
  setQuery: (query: string) => set(() => ({ query })),
  toggleItem: (id, character) => set((state) => {
    if (state.selectedItems[id]) {
      delete state.selectedItems[id]
      return {
        selectedItems: {
          ...state.selectedItems
        }
      }
    }

    return {
      selectedItems: {
        ...state.selectedItems,
        [id]: character
      }
    }
  }),
  addItem: (id, character) => set((state) => ({
    selectedItems: {
      ...state.selectedItems,
      [id]: character
    }
  })),
  removeItem: (id) => set((state) => {
    delete state.selectedItems[id]
    return {
      selectedItems: {
        ...state.selectedItems
      }
    }
  })
}));
