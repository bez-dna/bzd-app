import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class SourceStore {
  source: Source | null = null;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSource = (source: Source, user: User) => {
    this.source = source;
    this.user = user;
  };

  clearSource = () => {
    this.source = null;
    this.user = null;
  };
}

export const SourceStoreContext = createContext<SourceStore | null>(null);

export const useSourceStore = (): SourceStore => {
  const sourceStore = useContext(SourceStoreContext);

  if (sourceStore === null) throw new Error("PANIC!");

  return sourceStore;
};

export type Source = {
  source_id: string;
};

export type User = {
  user_id: string;
  name: string;
};
