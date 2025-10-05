import { observer } from "mobx-react-lite";

import { AuthScreen } from "../auth/AuthScreen";
import { useMainStore } from "../main/MainStore";
import { SourcesList } from "./SourcesList";
import { SourcesStore, SourcesStoreContext } from "./SourcesStore";

export const SourcesScreen = observer(() => {
  const mainStore = useMainStore();

  if (!mainStore.isAuth) return <AuthScreen />;

  return (
    <SourcesStoreContext.Provider value={new SourcesStore()}>
      <SourcesList />
    </SourcesStoreContext.Provider>
  );
});
