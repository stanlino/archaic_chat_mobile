import create from 'zustand'
import { Message } from '../@types/dtos/message'

interface MessagesStore {
  messages: Message[]
  addMessage: (message: Message) => void
  highlightedMessage: Message | null
  setHighlightedMessage: (message: Message | null) => void
  currentReplyedMessage: Message | null
  setCurrentReplyedMessage: (message: Message | null) => void
  clearMessages: () => void
}

const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  addMessage: (message: Message) => set(state => ({ messages: [...state.messages, message] })),
  highlightedMessage: null,
  setHighlightedMessage: (message: Message | null) => set({ highlightedMessage: message }),
  currentReplyedMessage: null,
  setCurrentReplyedMessage: (message: Message | null) => set({ currentReplyedMessage: message }),
  clearMessages: () => set(state => ({ messages: [] }))
}))

export { useMessagesStore }