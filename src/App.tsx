import { createStaticNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Layout } from "./layout/Layout";
import { MainStore, MainStoreContext } from "./main/MainStore";
import { MainTabs } from "./main/MainTabs";

const Navigation = createStaticNavigation(MainTabs);

export const App = () => {
  const mainStore = new MainStore();

  useEffect(() => {
    (async () => {
      await mainStore.initialize();
    })();
  }, [mainStore.initialize]);

  return (
    <MainStoreContext.Provider value={mainStore}>
      <Layout>
        <Navigation />
      </Layout>
    </MainStoreContext.Provider>
  );
};
