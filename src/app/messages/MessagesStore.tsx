import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class MessagesStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const MessagesStoreContext = createContext<MessagesStore | null>(null);

export const useMessagesStore = (): MessagesStore => {
  const messagesStore = useContext(MessagesStoreContext);

  if (messagesStore === null) throw new Error("PANIC!");

  return messagesStore;
};
