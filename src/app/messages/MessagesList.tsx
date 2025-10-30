import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "./Header";
import { MessagesListItem } from "./MessagesListItem";
import { StyleSheet } from "react-native-unistyles";

export const MessagesList = () => {
  const _navigation = useNavigation();

  const data = [...Array(100).keys()].map((i) => {
    return {
      id: i,
      title: `TITLE - ${i}`,
    };
  });

  return (
    <FlatList
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      data={data}
      renderItem={({ item }) => <MessagesListItem {...item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const Footer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create((theme) => ({
  footer: {
    marginBottom: theme.margin.l,
  },
}));
