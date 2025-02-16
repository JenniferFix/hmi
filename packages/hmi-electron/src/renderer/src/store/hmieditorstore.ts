import { create } from 'zustand'

export type HMIEditorState = {
  selectedWidgets: string[]
}

export type HMIEditorAction = {
  addToSelected: (widgetId: string) => void
  removeFromSelected: (widgetId: string) => void
  clearSelection: () => void
  setSelected: (widgetId: string) => void
}

export const useHMIEditorStore = create<HMIEditorState & HMIEditorAction>((set) => ({
  selectedWidgets: [],
  addToSelected: (widgetId: string) =>
    set((state) => ({ selectedWidgets: [...state.selectedWidgets, widgetId] })),
  removeFromSelected: (widgetId: string) =>
    set((state) => ({
      selectedWidgets: state.selectedWidgets.filter((item) => item !== widgetId)
    })),
  clearSelection: () => set(() => ({ selectedWidgets: [] })),
  setSelected: (widgetId: string) => set(() => ({ selectedWidgets: [widgetId] }))
}))
