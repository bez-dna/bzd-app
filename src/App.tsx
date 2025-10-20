import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
import { StrictMode, useEffect } from "react";
import { MainStore, MainStoreContext } from "./app/main/MainStore";
import { Layout } from "./layout/Layout";

import "./unistyles";
import { useUnistyles } from "react-native-unistyles";
import { MainTabs } from "./app/main/MainTabs";
import type { MessagesStack } from "./app/messages/MessagesStack";
import type { NewMessageStack } from "./app/new-message/NewMessageStack";

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
    <MainStoreContext.Provider value={mainStore}>
      <Layout>
        <Navigation theme={theme.navigation} />
      </Layout>
    </MainStoreContext.Provider>
  );
};

type MainTabsParamList = StaticParamList<typeof MainTabs>;

type MessagesStackParamList = StaticParamList<typeof MessagesStack>;

type NewMessageStackParamList = StaticParamList<typeof NewMessageStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainTabsParamList,
        MessagesStackParamList,
        NewMessageStackParamList {}
  }
}
