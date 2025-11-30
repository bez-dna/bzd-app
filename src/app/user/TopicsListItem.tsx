import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { Rate } from "./Rate";
import { Timing } from "./Timing";
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

  const hasTopicUser = useMemo(() => {
    return topic.topic_user !== null;
  }, [topic.topic_user]);

  return (
    <View style={styles.root}>
      <View style={styles.topic}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{topic.title}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.press} onPress={handlePress}>
            <Text style={styles.button(pending)}>
              {hasTopicUser ? "Отписаться" : "Подписаться"}
            </Text>
          </Pressable>
        </View>
      </View>

      {topic.topic_user !== null && (
        <View style={styles.config}>
          <View style={styles.timing}>
            <Timing topic_user={topic.topic_user} />
          </View>

          <View style={styles.rate}>
            <Rate topic_user={topic.topic_user} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    marginBottom: theme.margin.m,
  },

  topic: {
    flexDirection: "row",
    paddingHorizontal: theme.padding.x,
  },

  title: {
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: theme.padding.x * 2,
  },

  actions: {
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  titleText: {
    fontSize: theme.fonts.base * 1.125,
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

  config: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: theme.padding.x,
  },

  timing: {
    paddingRight: theme.padding.x,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },

  rate: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    paddingLeft: theme.padding.x,
  },
}));
