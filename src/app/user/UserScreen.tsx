import { observer } from "mobx-react-lite";
import type { StaticScreenProps } from "@react-navigation/native";

import { AuthScreen } from "../auth/AuthScreen";
import { useMainStore } from "../main/MainStore";
import { Source } from "./User";
import { UserStore, UserStoreContext } from "./UserStore";

type Props = StaticScreenProps<{
  user_id: string;
}>;

export const UserScreen = observer(({ route }: Props) => {
  const { user_id } = route.params;

  const mainStore = useMainStore();

  if (!mainStore.isAuth) return <AuthScreen />;

  return (
    <UserStoreContext.Provider value={new UserStore()}>
      <Source user_id={user_id} />
    </UserStoreContext.Provider>
  );
});
