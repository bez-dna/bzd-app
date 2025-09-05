import { Text, View } from "react-native"
import { MainTabs } from "./main/MainTabs"
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStore, MainStoreContext } from "./main/MainStore";
import { Layout } from "./layout/Layout";
import { useEffect } from "react";
import { API, APIContext } from "./api/Api";


const Navigation = createStaticNavigation(MainTabs);

export const App = () => {
  const mainStore = new MainStore()
  // const api = new API(mainStore)

  useEffect(() => {
    (async () => {
      await mainStore.initialize();
    })()
  }, []);

  return (
    <MainStoreContext.Provider value={mainStore}>
      <Layout>
        <Navigation />
        </Layout>
    </MainStoreContext.Provider>
  )
}
