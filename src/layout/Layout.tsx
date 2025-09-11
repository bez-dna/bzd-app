import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import type { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { createTamagui, TamaguiProvider } from "tamagui";
import { useMainStore } from "../main/MainStore";

export const Layout = observer(({ children }: PropsWithChildren) => {
  const mainStore = useMainStore();
  const colorScheme = useColorScheme();
  // const tamaguiConfig = createTamagui(defaultConfig);

  return (
    <View style={[styles.root]}>
      {mainStore.initialized ? children : <ActivityIndicator />}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "pink",
    flex: 1,
    // flexDirection: "column",
    // alignContent: "center",
    // padding: 20,
  },
});
