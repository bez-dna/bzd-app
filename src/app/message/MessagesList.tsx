import { FlatList, Text, View } from "react-native";

import { useMessageStore } from "./MessageStore";
import { MessagesListItem } from "./MessagesListItem";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

export const MessagesList = observer(() => {
  const store = useMessageStore();

  const handleEndReached = async () => {
    // TBD: нужно сделать лэйзи автолоадер
    // console.log(`handleEndReached - ${store.message_id}`);
    // if (store.loading) {
    //   console.log("IGNORE");
    //   return;
    // }
    // await store.update();
  };

  if (!store.initialized)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );

  return (
    <FlatList
      style={styles.root}
      inverted={true}
      ListHeaderComponent={Header}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      ListFooterComponent={Footer}
      data={[...store.messages.values()]}
      renderItem={({ item }) => <MessagesListItem message={item} />}
      keyExtractor={(message) => message.message_id}
    />
  );
});

const styles = StyleSheet.create((_theme) => ({
  root: {},
}));
