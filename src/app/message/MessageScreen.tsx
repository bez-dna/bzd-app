import { StaticScreenProps } from "@react-navigation/native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = StaticScreenProps<{
  messageId: string;
}>;

export const MessageScreen = ({ route }: Props) => {
  const { messageId } = route.params;

  return (
    <SafeAreaView>
      <Text>MessageScreen {messageId}</Text>
    </SafeAreaView>
  );
};
