import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const CreateMessageScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>CreateMessageScreen</Text>

      <Button title="TO TOPICS" onPress={() => navigation.navigate("Topics")} />
    </SafeAreaView>
  );
};
