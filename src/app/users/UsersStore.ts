import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class UsersStore {
  sources: Sources = [];
  contacts: Contacts = [];

  constructor() {
    makeAutoObservable(this);
  }

  setData = (sources: Sources, contacts: Contacts) => {
    this.sources = sources;
    this.contacts = contacts;
  };

  clearData = () => {
    this.sources = [];
    this.contacts = [];
  };
}

export const UsersStoreContext = createContext<UsersStore | null>(null);

export const useUsersStore = (): UsersStore => {
  const store = useContext(UsersStoreContext);

  if (store === null) throw new Error("PANIC!");

  return store;
};

export type Source = {
  source_id: string;
  user: {
    user_id: string;
    name: string;
    phone: string;
    abbr: string;
    color: string;
  };
};

export type Sources = Source[];

export type Contact = {
  contact_id: string;
  contact_name: string;
  user: {
    user_id: string;
    name: string;
    phone: string;
    abbr: string;
    color: string;
  };
};

export type Contacts = Contact[];
