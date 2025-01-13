import { create } from 'zustand'

type EditorState = {
  selectedWidgets: string[]
}

type EditorAction = {
  addToSelected: (widgetId: string) => void
  removeFromSelected: (widgetId: string) => void
  clearSelection: () => void
  setSelected: (widgetId: string) => void
}

export const useEditorStore = create<EditorState & EditorAction>((set) => ({
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
