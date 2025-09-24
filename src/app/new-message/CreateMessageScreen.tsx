import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { NewMessageStore, NewMessageStoreContext } from "./NewMessageStore";
import { CreateMessage } from "./CreateMessage";

export const CreateMessageScreen = () => {
  return (
    <NewMessageStoreContext.Provider value={new NewMessageStore()}>
      <CreateMessage />
    </NewMessageStoreContext.Provider>
  );
};
