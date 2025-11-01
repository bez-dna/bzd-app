import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class UserStore {
  source: Source | null = null;
  user: UserModel | null = null;
  topics: TopicsModel = [];

  constructor() {
    makeAutoObservable(this);
  }

  setData = (source: Source, user: UserModel, topics: TopicsModel) => {
    this.source = source;
    this.user = user;
    this.topics = topics;
  };

  clearData = () => {
    this.source = null;
    this.user = null;
    this.topics = [];
  };
}

export const UserStoreContext = createContext<UserStore | null>(null);

export const useUserStore = (): UserStore => {
  const userStore = useContext(UserStoreContext);

  if (userStore === null) throw new Error("PANIC!");

  return userStore;
};

export type Source = {
  source_id: string;
};

export type UserModel = {
  user_id: string;
  name: string;
  color: string;
  abbr: string;
};

export type TopicModel = {
  topic_id: string;
  title: string;

  topic_user: {
    topic_user_id: string;
  } | null;
};

export type TopicsModel = TopicModel[];
