import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MessageScreen } from "../message/MessageScreen";
import { CreateMessageScreen } from "../new-message/CreateMessageScreen";
import { TopicsScreen } from "../topics/TopicsScreen";
import { MessagesScreen } from "./MessagesScreen";

export const MessagesStack = createNativeStackNavigator({
  initialRouteName: "Messages",

  screens: {
    NewMessage: {
      screen: CreateMessageScreen,
      options: {
        presentation: "modal",
      },
    },

    Topics: {
      screen: TopicsScreen,
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
