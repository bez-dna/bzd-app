import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const MessageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>MessageScreen</Text>
    </SafeAreaView>
  )
}
