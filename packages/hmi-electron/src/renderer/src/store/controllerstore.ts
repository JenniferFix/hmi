import { create } from 'zustand'
import { type ControllerType } from '@db/schema'

export type ControllerState = {
  controllers: {
    [controllerId: string]: {
      connect: boolean
      connected: boolean
    }
  }
}

export type ControllerAction = {
  addController: ({
    controllerId,
    connect,
    connected
  }: {
    controllerId: string
    connect?: boolean
    connected?: boolean
  }) => void
  removeController: (controllerId: string) => void

  // clearSelection: () => void
  // setSelected: (widgetId: string) => void
}

export const useControllerStore = create<ControllerState & ControllerAction>((set) => ({
  controllers: {},
  addController: ({
    controllerId,
    connect,
    connected
  }: {
    controllerId: string
    connect?: boolean
    connected?: boolean
  }) =>
    set((state) => ({
      controllers: {
        ...state.controllers,
        [controllerId]: { connected: connected || false, connect: connect || false }
      }
    })),
  removeController: (controllerId: string) =>
    set((state) => {
      const { [controllerId]: removed, ...rest } = state.controllers
      return { controllers: rest }
    })
}))
