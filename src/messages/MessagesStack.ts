import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessageScreen } from "./MessageScreen";
import { MessagesScreen } from "./MessagesScreen";

export const MessagesStack = createNativeStackNavigator({
  screens: {
    Messages: {
      screen: MessagesScreen,
    },
    Message: {
      screen: MessageScreen,
    },
  },
  screenOptions: {
    headerShown: false,
  },
});
