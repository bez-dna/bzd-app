import { createStackNavigator } from "@react-navigation/stack";
import { TopicsScreen } from "../topics/TopicsScreen";
import { CreateMessageScreen } from "./CreateMessageScreen";

export const NewMessageStack = createStackNavigator({
  initialRouteName: "CreateMessage",

  screens: {
    CreateMessage: {
      screen: CreateMessageScreen,
      options: {
        headerBackTitle: "Close",
      },
    },
    Topics: {
      screen: TopicsScreen,
      options: {
        headerBackTitle: "Back",
      },
    },
  },

  screenOptions: {
    // headerTitle: "",
  },
});
