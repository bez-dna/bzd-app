import { createStackNavigator } from "@react-navigation/stack";
import { TopicsScreen } from "../../topics/TopicsScreen";
import { CreateMessageScreen } from "../CreateMessageScreen";

export const NewMessageStack = createStackNavigator({
  screens: {
    CreateMessage: {
      screen: CreateMessageScreen,
    },
    Topics: {
      screen: TopicsScreen,
    },
  },
  initialRouteName: "CreateMessage",
  screenOptions: {
    headerShown: false,
  },
});
