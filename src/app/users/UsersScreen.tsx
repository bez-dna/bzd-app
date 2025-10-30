import { observer } from "mobx-react-lite";

import { AuthScreen } from "../auth/AuthScreen";
import { useMainStore } from "../main/MainStore";
import { UsersList } from "./UsersList";
import { UsersStore, UsersStoreContext } from "./UsersStore";

export const UsersScreen = observer(() => {
  const mainStore = useMainStore();

  if (!mainStore.isAuth) return <AuthScreen />;

  return (
    <UsersStoreContext.Provider value={new UsersStore()}>
      <UsersList />
    </UsersStoreContext.Provider>
  );
});
