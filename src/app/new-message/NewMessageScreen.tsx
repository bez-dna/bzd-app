import { useAPI } from "../../api/Api";
import { NewMessageForm } from "./NewMessageForm";
import { NewMessageStore, NewMessageStoreContext } from "./NewMessageStore";

export const NewMessageScreen = () => {
  const api = useAPI();

  return (
    <NewMessageStoreContext.Provider value={new NewMessageStore(api)}>
      <NewMessageForm />
    </NewMessageStoreContext.Provider>
  );
};
