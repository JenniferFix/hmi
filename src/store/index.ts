import { create } from 'zustand'

type EditorState = {
  selectedComponents: string[]
}

type EditorAction = {
  addToSelected: (componentId: string) => void
  removeFromSelected: (componentId: string) => void
}

export const useEditorStore = create<EditorState & EditorAction>((set) => ({
  selectedComponents: [],
  addToSelected: (componentId: string) =>
    set((state) => ({ selectedComponents: [...state.selectedComponents, componentId] })),
  removeFromSelected: (componentId: string) =>
    set((state) => ({
      selectedComponents: state.selectedComponents.filter((item) => item !== componentId)
    }))
}))
