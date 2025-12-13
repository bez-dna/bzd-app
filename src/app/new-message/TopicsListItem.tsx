import { HashIcon } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { type TopicModel, useNewMessageStore } from "./NewMessageStore";

export const TopicsListItem = observer(({ topic }: { topic: TopicModel }) => {
  const store = useNewMessageStore();

  const handlePress = () => {
    store.toggleTopicId(topic.topic_id);
  };

  const isActive = useMemo(() => {
    return store.topic_ids.includes(topic.topic_id);
  }, [store.topic_ids, topic.topic_id]);

  return (
    <Pressable style={styles.press(isActive)} onPress={handlePress}>
      <HashIcon style={styles.icon} size={16} strokeWidth={3} />

      <View style={styles.button}>
        <Text style={styles.buttonText}>{topic.title}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create((theme) => ({
  press: (active: boolean) => ({
    backgroundColor: active ? "red" : theme.colors.background.secondary,
    borderRadius: theme.border.radius,
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.padding.y,
    marginRight: theme.padding.y,
    flexDirection: "row",
    alignItems: "center",
  }),

  button: {
    paddingVertical: theme.padding.y,
  },

  buttonText: {
    fontWeight: 500,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.main,
  },

  icon: {
    marginRight: 2,
    color: theme.colors.text.primary,
  },
}));
