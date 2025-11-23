import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { type TopicModel, useUserStore } from "./UserStore";

export const TopicListItem = ({ topic }: { topic: TopicModel }) => {
  const api = useAPI();
  const store = useUserStore();

  const [pending, setPending] = useState(false);

  const handleCreate = async () => {
    await api.topics.create_topic_user({
      topic_id: topic.topic_id,
    });

    await store.update();
  };

  const handleDelete = async (topic_user_id: string) => {
    await api.topics.delete_topic_user({
      topic_user_id,
    });

    await store.update();
  };

  const handlePress = async () => {
    setPending(true);

    if (topic.topic_user === null) {
      await handleCreate();
    } else {
      await handleDelete(topic.topic_user.topic_user_id);
    }

    setPending(false);
  };

  return (
    <View style={styles.root}>
      <View style={styles.data}>
        <Text style={styles.title}>{topic.title}</Text>
      </View>

      <View style={styles.actions}>
        {topic.topic_user === null ? (
          <Pressable style={styles.press} onPress={handlePress}>
            <Text style={styles.button(pending)}>Подписаться</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.press} onPress={handlePress}>
            <Text style={styles.button(pending)}>Отписаться</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.margin.s,
  },

  data: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: theme.padding.x * 2,
  },

  actions: {
    justifyContent: "center",
  },

  topicXX: {
    alignSelf: "stretch",
    paddingHorizontal: theme.padding.x,
    flexGrow: 1,
    paddingTop: theme.margin.s,
    paddingBottom: theme.margin.m,
  },

  title: {
    fontSize: theme.fonts.base,
    fontWeight: 700,
    color: theme.colors.text.primary,
  },

  press: {},

  button: (disabled: boolean) => ({
    // borderColor: theme.colors.border,
    // borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: theme.padding.y,
    paddingVertical: theme.padding.y / 2,
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontWeight: 700,
    opacity: disabled ? 0.2 : 1,
    // backgroundColor: active ? theme.colors.border : "transparent",
  }),
}));
