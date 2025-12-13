import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useMemo } from "react";

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
      <Text style={styles.button}>{`#${topic.title}`}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create((theme) => ({
  press: (active: boolean) => ({
    backgroundColor: active ? "red" : "grey",
    borderRadius: theme.border.radius,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y,
    marginBottom: theme.padding.y,
    marginRight: theme.padding.y,
  }),

  button: {
    fontWeight: 700,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.main,
  },
}));
