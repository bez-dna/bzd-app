import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessageScreen } from "../message/MessageScreen";
import { NewMessageStack } from "../new-message/NewMessageStack";
import { MessagesScreen } from "./MessagesScreen";

export const MessagesStack = createNativeStackNavigator({
  initialRouteName: "Messages",

  screens: {
    NewMessage: {
      screen: NewMessageStack,
      options: {
        animation: "fade_from_bottom",
      },
    },

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
