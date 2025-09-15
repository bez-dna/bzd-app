import {
  createStaticNavigation,
  type StaticParamList,
} from "@react-navigation/native";
import { StrictMode, useEffect } from "react";
import { Layout } from "./layout/Layout";
import { MainStore, MainStoreContext } from "./main/MainStore";

import "./unistyles";
import { useUnistyles } from "react-native-unistyles";
import { MainTabs } from "./main/MainTabs";
import type { MessagesStack } from "./messages/MessagesStack";
import type { NewMessageStack } from "./messages/new/NewMessageStack";

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

type NewMessageStackParamList = StaticParamList<typeof NewMessageStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends MainTabsParamList,
        MessagesStackParamList,
        NewMessageStackParamList {}
  }
}
