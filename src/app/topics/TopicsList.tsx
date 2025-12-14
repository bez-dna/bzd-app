import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { Header } from "./Header";
import { NewTopic } from "./NewTopic";
import { type TopicModel, useTopicsStore } from "./TopicsStore";
import { useFocusEffect } from "@react-navigation/native";
import { TopicsListItem } from "./TopicsListItem";

export const TopicsList = observer(() => {
  const store = useTopicsStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.initialize();
      })();

      return () => {
        store.terminate();
      };
    }, [store.initialize, store.terminate]),
  );

  return (
    <FlatList
      data={store.topics}
      ListHeaderComponent={<Header />}
      renderItem={({ item }) => <TopicsListItem topic={item} />}
      keyExtractor={(it) => it.topic_id}
    />
  );
});
