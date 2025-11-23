import { useFocusEffect } from "@react-navigation/native";
import { Observer, observer } from "mobx-react-lite";
import { useCallback } from "react";

import { AuthStore, AuthStoreContext } from "./AuthStore";
import { Complete } from "./Complete";
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
    <AuthStoreContext.Provider value={authStore}>
      <Observer>
        {() => (!authStore.isComplete ? <Join /> : <Complete />)}
      </Observer>
    </AuthStoreContext.Provider>
  );
});
