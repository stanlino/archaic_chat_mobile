import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';

import { Routes } from './src/routes';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  if (!fontsLoaded) return null;

  return [
    <StatusBar 
      style="light" 
      translucent={false} 
      backgroundColor="#111827" 
      key="status-bar" 
    />,
    <Routes key="routes" />
  ]
}