import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { FlatList } from "react-native";

import { Header } from "./Header";
import { TopicsListItem } from "./TopicsListItem";
import { useTopicsStore } from "./TopicsStore";

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
