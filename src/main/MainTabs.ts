import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MessagesStack } from "../messages/MessagesStack";
import { SourcesScreen } from "../sources/SourcesScreen";

export const MainTabs = createBottomTabNavigator({
  initialRouteName: "Sources",
  screens: {
    Main: {
      screen: MessagesStack,
    },
    Sources: {
      screen: SourcesScreen,
    },
  },
  screenOptions: {
    headerShown: false,
  },
});
