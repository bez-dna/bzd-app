import { CreateMessage } from "./CreateMessage";
import { NewMessageStore, NewMessageStoreContext } from "./NewMessageStore";

export const CreateMessageScreen = () => {
  return (
    <NewMessageStoreContext.Provider value={new NewMessageStore()}>
      <CreateMessage />
    </NewMessageStoreContext.Provider>
  );
};
