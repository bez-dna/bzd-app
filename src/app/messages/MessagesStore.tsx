import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class MessagesStore {
  api: API;
  messages: Map<string, MessageModel> = new Map();
  cursor_message_id: CursorMessageIdModel = null;

  constructor(api: API) {
    makeAutoObservable(this);

    this.api = api;
  }

  updateData = async () => {
    const { messages, cursor_message_id } =
      await this.api.messages.get_user_messages({
        cursor_message_id: this.cursor_message_id,
      });

    runInAction(() => {
      for (const message of messages) {
        if (!this.messages.has(message.message_id)) {
          this.messages.set(message.message_id, message);
        }
      }

      // this.messages = [...this.messages, ...messages];
      this.cursor_message_id = cursor_message_id;
    });
  };

  clearData = () => {};
}

export const MessagesStoreContext = createContext<MessagesStore | null>(null);

export const useMessagesStore = (): MessagesStore => {
  const store = useContext(MessagesStoreContext);

  if (store === null) throw new Error("PANIC!");

  return store;
};

export type MessageModel = {
  message_id: string;
  text: string;
};

export type MessagesModel = MessageModel[];

type CursorMessageIdModel = string | null;
