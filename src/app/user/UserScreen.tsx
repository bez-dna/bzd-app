import type { StaticScreenProps } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

import { UserDetails } from "./UserDetails";
import { UserStore, UserStoreContext } from "./UserStore";
import { useAPI } from "../../api/Api";

type Props = StaticScreenProps<{
  userId: string;
}>;

export const UserScreen = observer(({ route }: Props) => {
  const { userId } = route.params;
  const api = useAPI();

  return (
    <UserStoreContext.Provider value={new UserStore(api, userId)}>
      <UserDetails />
    </UserStoreContext.Provider>
  );
});
