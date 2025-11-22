import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

import { Header } from "./Header";
import { MessagesListItem } from "./MessagesListItem";
import { useCallback } from "react";
import { useMessagesStore } from "./MessagesStore";
import { useMainStore } from "../main/MainStore";

export const MessagesList = observer(() => {
  const nav = useNavigation();
  const store = useMessagesStore();
  const mainStore = useMainStore();

  useFocusEffect(
    useCallback(() => {
      if (!mainStore.isAuth) {
        nav.navigate("UsersStack");
        return;
      }

      (async () => {
        await store.updateData();
      })();

      return () => {
        store.clearData();
      };
    }, [store.updateData, store.clearData, mainStore.isAuth, nav.navigate]),
  );

  const handleEndReached = async () => {
    await store.updateData();
  };

  return (
    <FlatList
      ListHeaderComponent={Header}
      onEndReached={handleEndReached}
      ListFooterComponent={Footer}
      data={[...store.messages.values()]}
      renderItem={({ item }) => <MessagesListItem message={item} />}
      keyExtractor={(message) => message.message_id}
    />
  );
});

const Footer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create((theme) => ({
  footer: {
    marginBottom: theme.margin.l,
  },
}));
