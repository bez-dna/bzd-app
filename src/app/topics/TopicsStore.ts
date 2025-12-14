import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";
import { MainStore } from "../main/MainStore";

export class TopicsStore {
  api: API;

  title: string = "";
  topics: TopicsModel = [];

  mainStore: MainStore;

  constructor(mainStore: MainStore) {
    makeAutoObservable(this);

    this.mainStore = mainStore;
    this.api = mainStore.api;
  }

  initialize = async () => {
    await this.update();
  };

  terminate = () => {
    this.mainStore.clearError("NEW_TOPIC");
  };

  update = async () => {
    const { topics } = await this.api.topics.get_topics();

    runInAction(() => {
      this.topics = topics;
    });
  };

  save = async (): Promise<void> => {
    await this.api.topics.create_topic({ title: this.title });

    runInAction(() => {
      this.title = "";
    });
  };

  setTitle = (title: string) => {
    this.title = title;
  };
}

export const TopicsStoreContext = createContext<TopicsStore | null>(null);

export const useTopicsStore = (): TopicsStore => {
  const topicsStore = useContext(TopicsStoreContext);

  if (topicsStore === null) throw new Error("PANIC!");

  return topicsStore;
};

export type TopicModel = {
  topic_id: string;
  title: string;
};

export type TopicsModel = TopicModel[];
