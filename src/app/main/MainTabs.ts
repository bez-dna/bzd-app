import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MessagesStack } from "../messages/MessagesStack";
import { SourcesStack } from "../sources/SourcesStack";

export const MainTabs = createBottomTabNavigator({
  initialRouteName: "MessagesStack",
  screens: {
    MessagesStack: {
      screen: MessagesStack,
    },

    SourcesStack: {
      screen: SourcesStack,
    },
  },

  screenOptions: {
    headerShown: false,
    tabBarStyle: { display: "none" },
  },
});
