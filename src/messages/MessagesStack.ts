import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessagesScreen } from "./MessagesScreen";
import { MessageScreen } from "./MessageScreen";

export const MessagesStack = createNativeStackNavigator({
  screens: {
    Messages: {
      screen: MessagesScreen
    },
    Message: {
      screen: MessageScreen
    }
  },
  screenOptions: {
    headerShown: false
  }
})
