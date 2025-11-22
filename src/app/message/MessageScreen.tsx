import type { StaticScreenProps } from "@react-navigation/native";

import { useAPI } from "../../api/Api";
import { MessageDetails } from "./MessageDetails";
import { MessageStore, MessageStoreContext } from "./MessageStore";

type Props = StaticScreenProps<{
  messageId: string;
}>;

export const MessageScreen = ({ route }: Props) => {
  const { messageId } = route.params;
  const api = useAPI();

  return (
    <MessageStoreContext.Provider value={new MessageStore(api, messageId)}>
      <MessageDetails />
    </MessageStoreContext.Provider>
  );
};
