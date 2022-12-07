import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { ChatScreen } from "../screens/chat"
import { HomeScreen } from "../screens/home"
import { RoomsScreen } from "../screens/rooms"

const { Navigator, Screen } = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Screen name="home" component={HomeScreen} />
        <Screen name="rooms" component={RoomsScreen} />
        <Screen name="chat" component={ChatScreen} />
      </Navigator>
    </NavigationContainer>
  )
}