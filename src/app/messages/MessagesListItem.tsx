import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { MessageModel } from "./MessagesStore";

export const MessagesListItem = ({ message }: { message: MessageModel }) => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Message", { messageId: message.message_id });
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>{message.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.margin.s,
  },

  text: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.main,
  },
}));
