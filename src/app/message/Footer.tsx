import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

import { useMessageStore } from "./MessageStore";

export const Footer = observer(() => {
  const store = useMessageStore();

  return (
    <SafeAreaView style={styles.root} edges={["top", "right", "left"]}>
      <View>
        <Text> {store.message_id}</Text>
      </View>

      {store.loading && (
        <View>
          <Text>LOADING</Text>
        </View>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create((_theme) => ({
  root: {
    backgroundColor: "green",
    flexGrow: 1,
  },
}));
