import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MessagesScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>MessagesScreen</Text>
      <Button
        title="TO MESSAGE"
        onPress={() => navigation.navigate("Message")}
      />

      <Button
        title="TO SOURCES"
        onPress={() => navigation.navigate("Sources")}
      />

      <Button
        title="ADD NEW"
        onPress={() => navigation.navigate("NewMessage")}
      />
    </SafeAreaView>
  );
};
