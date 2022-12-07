import create from 'zustand'

interface SocketState {
  socket_id: string
  setSocketId: (socket_id: string) => void
}

const useScoketStore = create<SocketState>((set) => ({
  socket_id: '',
  setSocketId: (socket_id) => set({ socket_id }),
}))

export { useScoketStore }