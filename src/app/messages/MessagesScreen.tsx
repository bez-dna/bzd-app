import { observer } from "mobx-react-lite";

import { useAPI } from "../../api/Api";
import { useMainStore } from "../main/MainStore";
import { MessagesList } from "./MessagesList";
import { MessagesListNotAuth } from "./MessagesListNoAuth";
import { MessagesStore, MessagesStoreContext } from "./MessagesStore";

export const MessagesScreen = observer(() => {
  const api = useAPI();
  const mainStore = useMainStore();

  return (
    <MessagesStoreContext.Provider value={new MessagesStore(api)}>
      {mainStore.isAuth ? <MessagesList /> : <MessagesListNotAuth />}
    </MessagesStoreContext.Provider>
  );
});
