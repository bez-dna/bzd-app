import { observer } from "mobx-react-lite";

import { useAPI } from "../../api/Api";
import { AuthScreen } from "../auth/AuthScreen";
import { useMainStore } from "../main/MainStore";
import { UsersList } from "./UsersList";
import { UsersStore, UsersStoreContext } from "./UsersStore";

export const UsersScreen = observer(() => {
  const mainStore = useMainStore();
  const api = useAPI();

  if (!mainStore.isAuth) return <AuthScreen />;

  return (
    <UsersStoreContext.Provider value={new UsersStore(api)}>
      <UsersList />
    </UsersStoreContext.Provider>
  );
});
