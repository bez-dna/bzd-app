import { ActivityIndicator, Text, View } from "react-native";
import { useMainStore } from "../main/MainStore";
import { PropsWithChildren, use, useActionState, useEffect } from "react";
import { observer } from "mobx-react-lite";

export const Layout = observer(({ children }: PropsWithChildren) => {
  const mainStore = useMainStore();

  return (
    <View style={{ flex: 1 }}>
      {mainStore.initialized ? children : <ActivityIndicator />}
    </View>
  )
})
