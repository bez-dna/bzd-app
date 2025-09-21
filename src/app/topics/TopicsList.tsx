import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useAPI } from "../../api/Api";
import { NewTopic } from "./NewTopic";
import { type Topic, useTopicsStore } from "./TopicsStore";

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
    <View>
      <Text>TopicsScreen</Text>
      <FlatList
        data={topicsStore.topics}
        numColumns={3}
        renderItem={({ item }) => <TopicsListItem topic={item} />}
        keyExtractor={(it) => it.topic_id}
        ListFooterComponent={NewTopic}
      />
    </View>
  );
});

const TopicsListItem = ({ topic }: { topic: Topic }) => {
  return (
    <View>
      <Text>{topic.title}</Text>
    </View>
  );
};
