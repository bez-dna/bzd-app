import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class MessageStore {
  api: API;

  message_id: string;
  initialized = false;
  loading = false;
  finished = false;

  messages: Map<string, MessageModel> = new Map();
  cursor_message_id: CursorMessageIdModel = null;

  constructor(api: API, message_id: string) {
    makeAutoObservable(this);

    this.api = api;
    this.message_id = message_id;
  }

  initialize = async () => {
    await this.update();

    runInAction(() => {
      this.initialized = true;
    });
  };

  terminate = () => {
    this.initialized = false;
    this.finished = false;
    this.cursor_message_id = null;
    this.messages = new Map();
  };

  update = async () => {
    if (this.finished) return;

    this.loading = true;

    const { messages, cursor_message_id } =
      await this.api.messages.get_message_messages({
        message_id: this.message_id,
        cursor_message_id: this.cursor_message_id,
      });

    // for (const message of mmm()) {
    //   if (!this.messages.has(message.message_id)) {
    //     this.messages.set(message.message_id, message);
    //   }
    // }

    runInAction(() => {
      for (const message of messages) {
        if (!this.messages.has(message.message_id)) {
          this.messages.set(message.message_id, message);
        }
      }

      if (cursor_message_id === null) {
        this.finished = true;
      }

      this.cursor_message_id = cursor_message_id;
      this.loading = false;
    });
  };
}

export const MessageStoreContext = createContext<MessageStore | null>(null);

export const useMessageStore = (): MessageStore => {
  const store = useContext(MessageStoreContext);

  if (store === null) throw new Error("PANIC!");

  return store;
};

export type MessageModel = {
  message_id: string;
  text: string;
};

export type MessagesModel = MessageModel[];

type CursorMessageIdModel = string | null;
