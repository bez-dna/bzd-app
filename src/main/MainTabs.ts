import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SourcesScreen } from "../sources/SourcesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MessagesStack } from "../messages/MessagesStack";
import { MessagesScreen } from "../messages/MessagesScreen";

export const MainTabs = createBottomTabNavigator({
  screens: {
    Main: {
      screen: MessagesStack
    },
    Sources: {
      screen: SourcesScreen
    }
  },
  screenOptions: {
    headerShown: false
  }
})
