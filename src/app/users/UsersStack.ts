import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserScreen } from "../user/UserScreen";
import { UsersScreen } from "./UsersScreen";
// import { UserScreen } from "../user/UserScreen";

export const UsersStack = createNativeStackNavigator({
  initialRouteName: "Users",

  screens: {
    Users: {
      screen: UsersScreen,
    },

    User: {
      screen: UserScreen,
    },
  },

  screenOptions: {
    headerShown: false,
  },
});
