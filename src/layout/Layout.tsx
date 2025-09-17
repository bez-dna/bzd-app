import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useMainStore } from "../app/main/MainStore";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const Layout = observer(({ children }: PropsWithChildren) => {
  const mainStore = useMainStore();

  return (
    <SafeAreaProvider style={[styles.root]}>
      {mainStore.initialized ? children : <ActivityIndicator />}
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
  },
});
