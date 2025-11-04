import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { type TopicModel, type TopicsModel, useUsersStore } from "./UsersStore";

export const TopicsList = ({ topics }: { topics: TopicsModel }) => {
  return (
    <View style={styles.list}>
      {topics.map((topic) => (
        <View style={styles.item} key={topic.topic_id}>
          <TopicListItem topic={topic} />
        </View>
      ))}
    </View>
  );
};

const TopicListItem = ({ topic }: { topic: TopicModel }) => {
  const api = useAPI();
  const store = useUsersStore();

  const handleCreate = async () => {
    await api.topics.create_topic_user({
      topic_id: topic.topic_id,
    });

    await store.updateData();
  };

  const handleDelete = async (topic_user_id: string) => {
    await api.topics.delete_topic_user({
      topic_user_id,
    });

    await store.updateData();
  };

  const handlePress = () => {
    if (topic.topic_user === null) {
      return handleCreate();
    } else {
      return handleDelete(topic.topic_user.topic_user_id);
    }
  };

  return topic.topic_user === null ? (
    <Pressable style={styles.press} onPress={handlePress}>
      <Text style={styles.button(false)} numberOfLines={1}>
        {topic.title}
      </Text>
    </Pressable>
  ) : (
    <Pressable style={styles.press} onPress={handlePress}>
      <Text style={styles.button(true)} numberOfLines={1}>
        {topic.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: theme.padding.y,
  },

  item: {
    maxWidth: 160,
    marginRight: theme.padding.y,
    marginTop: theme.padding.y,
  },

  press: {},

  button: (active: boolean) => ({
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: theme.padding.y * 2,
    paddingVertical: theme.padding.y,
    color: theme.colors.text.primary,
    backgroundColor: active ? theme.colors.border : "transparent",
  }),
}));
