import { MessagesList } from "./MessagesList";
import { MessagesStore, MessagesStoreContext } from "./MessagesStore";

export const MessagesScreen = () => {
  return (
    <MessagesStoreContext.Provider value={new MessagesStore()}>
      <MessagesList />
    </MessagesStoreContext.Provider>
  );
};
