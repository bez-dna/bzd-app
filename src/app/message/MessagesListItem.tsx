import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

import { useMessageStore, type MessageModel } from "./MessageStore";
import type { MessagesStackNavigationProp } from "../../App";

export const MessagesListItem = observer(
  ({ message }: { message: MessageModel }) => {
    const nav = useNavigation<MessagesStackNavigationProp<"Message">>();
    const store = useMessageStore();

    const handlePress = () => {
      if (store.message_id !== message.message_id) {
        nav.push("Message", { messageId: message.message_id });
      }
    };

    return (
      <View style={styles.root}>
        <Pressable onPress={handlePress}>
          <Text style={styles.text}>{message.text}</Text>
        </Pressable>
      </View>
    );
  },
);

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
