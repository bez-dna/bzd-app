import type { StaticScreenProps } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

import { useAPI } from "../../api/Api";
import { UserDetails } from "./UserDetails";
import { UserStore, UserStoreContext } from "./UserStore";

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
