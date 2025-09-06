import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";
import { useMainStore } from "../main/MainStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
  const mainStore = useMainStore();

  return (
    <View style={{ flex: 1 }}>
      {mainStore.initialized ? children : <ActivityIndicator />}
    </View>
  );
});
