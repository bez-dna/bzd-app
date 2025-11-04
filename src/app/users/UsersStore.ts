import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class UsersStore {
  api: API;
  sources: SourcesModel = [];
  contacts: ContactsModel = [];

  constructor(api: API) {
    makeAutoObservable(this);

    this.api = api;
  }

  updateData = async () => {
    const { sources, contacts } = await this.api.users.get_users();

    runInAction(() => {
      this.setData(sources, contacts);
    });
  };

  setData = (sources: SourcesModel, contacts: ContactsModel) => {
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

export type SourceModel = {
  source_id: string;

  user: {
    user_id: string;
    name: string;
    phone: string;
    abbr: string;
    color: string;
  };

  topics: TopicsModel;
};

export type SourcesModel = SourceModel[];

export type ContactModel = {
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

export type ContactsModel = ContactModel[];

export type TopicModel = {
  topic_id: string;
  title: string;
  topic_user: {
    topic_user_id: string;
  } | null;
};

export type TopicsModel = TopicModel[];
