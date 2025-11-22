import { observer } from "mobx-react-lite";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { MessagesList } from "./MessagesList";
import { useMessageStore } from "./MessageStore";

export const MessageDetails = observer(() => {
  const store = useMessageStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.initialize();
      })();

      return () => {
        store.terminate();
      };
    }, [store.initialize, store.terminate]),
  );

  return <MessagesList />;
});
