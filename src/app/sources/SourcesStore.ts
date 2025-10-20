import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class SourcesStore {
  sources: Sources = [];
  contacts: Contacts = [];

  constructor() {
    makeAutoObservable(this);
  }

  setContacts = (contacts: Contacts) => {
    this.contacts = contacts;
  };

  clearContacts = () => {
    this.contacts = [];
  };

  setSources = (sources: Sources) => {
    this.sources = sources;
  };

  clearSources = () => {
    this.sources = [];
  };
}

export const SourcesStoreContext = createContext<SourcesStore | null>(null);

export const useSourcesStore = (): SourcesStore => {
  const sourcesStore = useContext(SourcesStoreContext);

  if (sourcesStore === null) throw new Error("PANIC!");

  return sourcesStore;
};

export type Source = {
  source_id: string;
  user_id: string;
  name: string;
  phone: string;
  abbr: string;
  color: string;
};

export type Sources = Source[];

export type Contact = {
  contact_id: string;
  contact_name: string;
  user_id: string;
  name: string;
  phone: string;
  abbr: string;
  color: string;
};

export type Contacts = Contact[];
