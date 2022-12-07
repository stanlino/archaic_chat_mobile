import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { ChatScreen } from "../screens/chat"
import { HomeScreen } from "../screens/home"
import { RoomsScreen } from "../screens/rooms"

const { Navigator, Screen } = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Rooms" component={RoomsScreen} />
        <Screen name="Chat" component={ChatScreen} />
      </Navigator>
    </NavigationContainer>
  )
}