import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Auth } from "../auth/Auth";
import { useMainStore } from "../main/MainStore";
import { SourcesList } from "./SourcesList";
import { SourcesStore, SourcesStoreContext } from "./SourcesStore";

export const SourcesScreen = observer(() => {
  const mainStore = useMainStore();

  return (
    <SourcesStoreContext.Provider value={new SourcesStore()}>
      <SafeAreaView style={styles.root}>
        {!mainStore.isAuth ? <Auth /> : <SourcesList />}
      </SafeAreaView>
    </SourcesStoreContext.Provider>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
