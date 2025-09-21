import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class TopicsStore {
  topics: Topics = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTopics = (topics: Topics) => {
    this.topics = topics;
  };
}

export const TopicsStoreContext = createContext<TopicsStore | null>(null);

export const useTopicsStore = (): TopicsStore => {
  const topicsStore = useContext(TopicsStoreContext);

  if (topicsStore === null) throw new Error("PANIC!");

  return topicsStore;
};

export type Topic = {
  topic_id: string;
  title: string;
};

type Topics = Topic[];
