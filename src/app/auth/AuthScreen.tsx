import { useFocusEffect } from "@react-navigation/native";
import { Observer, observer } from "mobx-react-lite";
import { useCallback } from "react";
import { AuthStore, AuthStoreContext } from "./AuthStore";
import { Complete } from "./Complete";
import { Join } from "./Join";
import { Header } from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";

export const AuthScreen = observer(() => {
  const authStore = new AuthStore();

  useFocusEffect(
    useCallback(() => {
      return () => {
        authStore.clearVerificationId();
      };
    }, [authStore.clearVerificationId]),
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
