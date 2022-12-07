import create from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserStore {
  username: string
  setUsername: (username: string) => void
  color: string
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};


const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: null as unknown as string,
      setUsername: (username: string) => set({ username }),
      color: generateColor()
    }),
    {
      name: '@archaic/user_storage',
      getStorage: () => AsyncStorage,
    }
  )
)

export { useUserStore }