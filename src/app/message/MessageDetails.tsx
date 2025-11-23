import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

import { useMessageStore } from "./MessageStore";
import { MessagesList } from "./MessagesList";

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
