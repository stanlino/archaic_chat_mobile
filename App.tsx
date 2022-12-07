import { useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
  })

  if (!fontsLoaded) return null;

  return [
    <StatusBar style="auto" />,
    <Routes />
  ]
}