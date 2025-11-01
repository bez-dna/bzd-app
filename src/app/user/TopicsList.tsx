import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import type { TopicModel, TopicsModel } from "./UserStore";

export const TopicsList = ({ topics }: { topics: TopicsModel }) => {
  return (
    <View style={styles.root}>
      <View style={styles.list}>
        {topics.map((topic) => (
          <View style={styles.item} key={topic.topic_id}>
            <TopicListItem topic={topic} />
          </View>
        ))}
      </View>
    </View>
  );
};

export const TopicListItem = ({ topic }: { topic: TopicModel }) => {
  const api = useAPI();

  const handleCreate = async () => {
    await api.topics.create_topic_user({
      topic_id: topic.topic_id,
    });

    // TODO: добавить релоад списка после добавления
  };

  const handleDelete = () => {};

  return (
    <>
      <View style={styles.topic}>
        <Text style={styles.title}>{topic.title}</Text>
      </View>

      {topic.topic_user === null ? (
        <Pressable style={styles.press} onPress={handleCreate}>
          <Text style={styles.button(false)}>Подписаться</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.press} onPress={handleDelete}>
          <Text style={styles.button(true)}>Отписаться</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
  },

  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.padding.x,
  },

  item: {
    flexBasis: "40%",
    flexGrow: 1,
    borderWidth: 4,
    borderColor: theme.colors.border,
  },

  topic: {
    alignSelf: "stretch",
    paddingHorizontal: theme.padding.x,
    flexGrow: 1,
    paddingTop: theme.margin.s,
    paddingBottom: theme.margin.m,
  },

  title: {
    fontSize: theme.fonts.base,
    fontWeight: 900,
    color: theme.colors.text.primary,
  },

  press: {
    borderTopWidth: 4,
    borderColor: theme.colors.border,
  },

  button: (active: boolean) => ({
    fontWeight: 700,
    padding: theme.padding.y,
    textAlign: "center",
    color: theme.colors.text.primary,
    backgroundColor: active ? theme.colors.border : "transparent",
  }),
}));
