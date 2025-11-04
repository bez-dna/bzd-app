import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

type ItemProps = { id: number; title: string };

export const MessagesListItem = ({ title, id }: ItemProps) => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Message", { messageId: id.toString() });
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Text style={{ color: "white" }}>{title}</Text>
      </Pressable>
    </View>
  );
};
