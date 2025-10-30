import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MessagesStack } from "../messages/MessagesStack";
import { UsersStack } from "../users/UsersStack";

export const MainTabs = createBottomTabNavigator({
  initialRouteName: "MessagesStack",
  screens: {
    MessagesStack: {
      screen: MessagesStack,
    },

    UsersStack: {
      screen: UsersStack,
    },
  },

  screenOptions: {
    headerShown: false,
    tabBarStyle: { display: "none" },
  },
});
