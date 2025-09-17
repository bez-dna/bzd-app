import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useMainStore } from "../app/main/MainStore";

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
