import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useAPI } from "../../api/Api";
import { NewTopic } from "./NewTopic";
import { type Topic, useTopicsStore } from "./TopicsStore";
import { StyleSheet } from "react-native-unistyles";

export const TopicsList = observer(() => {
  const topicsStore = useTopicsStore();
  const api = useAPI();

  useEffect(() => {
    (async () => {
      const topics = (await api.topics.get_topics()).topics;
      topicsStore.setTopics(topics);
    })();
  }, [api.topics.get_topics, topicsStore.setTopics]);

  return (
    <View style={styles.root}>
      <FlatList
        data={topicsStore.topics}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <TopicsListItem topic={item} />}
        keyExtractor={(it) => it.topic_id}
      />

      <NewTopic />
    </View>
  );
});

const TopicsListItem = ({ topic }: { topic: Topic }) => {
  return (
    <View style={[styles.topic]}>
      <Text style={[styles.label]}>{topic.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.margin.m,
  },

  list: {
    marginBottom: theme.padding.y * 2,
  },

  row: {
    gap: theme.padding.x,
    marginBottom: theme.padding.y,
  },

  topic: {
    flexGrow: 1,
    backgroundColor: theme.colors.background.secondary,
    paddingVertical: theme.padding.y * 2,
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.padding.y,
    borderRadius: theme.border.radius,
  },

  label: {
    color: theme.colors.text.primary,
  },
}));
