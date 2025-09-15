import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useMainStore } from "../main/MainStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
  const mainStore = useMainStore();

  return (
    <View style={[styles.root]}>
      {mainStore.initialized ? children : <ActivityIndicator />}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
