import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class SourcesStore {
  sources: Sources = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSources = (sources: Sources) => {
    this.sources = sources;
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
  title: string;
};

export type Sources = Source[];
