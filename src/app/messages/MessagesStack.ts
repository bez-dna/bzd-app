import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessageScreen } from "../message/MessageScreen";
import { NewMessageStack } from "../new-message/NewMessageStack";
import { MessagesScreen } from "./MessagesScreen";

export const MessagesStack = createNativeStackNavigator({
  initialRouteName: "Messages",
  groups: {
    MessagesModal: {
      screenOptions: {
        presentation: "modal",
      },
      screens: {
        NewMessage: {
          screen: NewMessageStack,
        },
      },
    },
    MessagesMain: {
      screens: {
        Messages: {
          screen: MessagesScreen,
        },
        Message: {
          screen: MessageScreen,
        },
      },
    },
  },

  screenOptions: {
    headerShown: false,
  },
});
