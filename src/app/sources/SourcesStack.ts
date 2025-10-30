import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SourcesScreen } from "./SourcesScreen";
import { SourceScreen } from "../source/SourceScreen";

export const SourcesStack = createNativeStackNavigator({
  initialRouteName: "Sources",

  screens: {
    Sources: {
      screen: SourcesScreen,
    },

    Source: {
      screen: SourceScreen,
    },
  },

  screenOptions: {
    headerShown: false,
  },
});
