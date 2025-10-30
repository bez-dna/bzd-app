import { observer } from "mobx-react-lite";
import { StaticScreenProps } from "@react-navigation/native";

import { AuthScreen } from "../auth/AuthScreen";
import { useMainStore } from "../main/MainStore";
import { Source } from "./Source";
import { SourceStore, SourceStoreContext } from "./SourceStore";

type Props = StaticScreenProps<{
  source_id: string;
}>;

export const SourceScreen = ({ route }: Props) => {
  const { source_id } = route.params;

  const mainStore = useMainStore();

  if (!mainStore.isAuth) return <AuthScreen />;

  return (
    <SourceStoreContext.Provider value={new SourceStore()}>
      <Source source_id={source_id} />
    </SourceStoreContext.Provider>
  );
};
