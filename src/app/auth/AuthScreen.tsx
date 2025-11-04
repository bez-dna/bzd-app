import { useFocusEffect } from "@react-navigation/native";
import { Observer, observer } from "mobx-react-lite";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthStore, AuthStoreContext } from "./AuthStore";
import { Complete } from "./Complete";
import { Header } from "./Header";
import { Join } from "./Join";

export const AuthScreen = observer(() => {
  const authStore = new AuthStore();

  useFocusEffect(
    useCallback(() => {
      return () => {
        authStore.clearJoinStep();
      };
    }, [authStore.clearJoinStep]),
  );

  return (
    <SafeAreaView>
      <AuthStoreContext.Provider value={authStore}>
        <Header />

        <Observer>
          {() => (!authStore.isComplete ? <Join /> : <Complete />)}
        </Observer>
      </AuthStoreContext.Provider>
    </SafeAreaView>
  );
});
