import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class UserStore {
  user_id: string;
  api: API;
  user: UserModel | null = null;
  topics: TopicsModel = [];

  constructor(api: API, user_id: string) {
    makeAutoObservable(this);

    this.api = api;
    this.user_id = user_id;
  }

  update = async () => {
    const { user } = await this.api.users.get_user({
      user_id: this.user_id,
    });

    const { topics } = await this.api.users.get_user_topics({
      user_id: this.user_id,
    });

    runInAction(() => {
      this.user = user;
      this.topics = topics;
    });
  };

  terminate = () => {
    this.user = null;
    this.topics = [];
  };
}

export const UserStoreContext = createContext<UserStore | null>(null);

export const useUserStore = (): UserStore => {
  const store = useContext(UserStoreContext);

  if (store === null) throw new Error("PANIC!");

  return store;
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
