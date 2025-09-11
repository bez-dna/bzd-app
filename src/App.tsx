import { createStaticNavigation } from "@react-navigation/native";
import { StrictMode, useEffect } from "react";
import { Layout } from "./layout/Layout";
import { MainStore, MainStoreContext } from "./main/MainStore";
import { MainTabs } from "./main/MainTabs";

import "./unistyles";
import { useUnistyles } from "react-native-unistyles";

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
