import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
import { StrictMode, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUnistyles } from "react-native-unistyles";

import { MainStore, MainStoreContext } from "./app/main/MainStore";
import { Layout } from "./layout/Layout";
import "./unistyles";
import { MainTabs } from "./app/main/MainTabs";
import type { MessagesStack } from "./app/messages/MessagesStack";
import { SourcesStack } from "./app/sources/SourcesStack";

const Navigation = createStaticNavigation(MainTabs);

export const App = () => {
  const mainStore = new MainStore();
  const { theme } = useUnistyles();

  useEffect(() => {
    (async () => {
      await mainStore.initialize();
    })();
  }, [mainStore.initialize]);

  return (
    <StrictMode>
      <MainStoreContext.Provider value={mainStore}>
        <Layout>
          <Navigation theme={theme.navigation} />
        </Layout>
      </MainStoreContext.Provider>
    </StrictMode>
  );
};

type MainTabsParamList = StaticParamList<typeof MainTabs>;

type MessagesStackParamList = StaticParamList<typeof MessagesStack>;
type SourcesStackParamList = StaticParamList<typeof SourcesStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainTabsParamList,
        SourcesStackParamList,
        MessagesStackParamList {}
  }
}

export type MessagesStackNavigationProp<
  T extends keyof MessagesStackParamList,
> = NativeStackNavigationProp<MessagesStackParamList, T>;
