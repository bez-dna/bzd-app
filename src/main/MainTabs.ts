import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MessagesStack } from "../messages/MessagesStack";
import { SourcesScreen } from "../sources/SourcesScreen";

export const MainTabs = createBottomTabNavigator({
  initialRouteName: "Main",
  screens: {
    Main: {
      screen: MessagesStack,
    },
    Sources: {
      screen: SourcesScreen,
    },
  },
  screenOptions: {
    tabBarStyle: { display: "none" },
    headerShown: false,
  },
});
