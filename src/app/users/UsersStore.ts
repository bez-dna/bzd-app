import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class UsersStore {
  api: API;
  users: UsersModel = [];

  constructor(api: API) {
    makeAutoObservable(this);

    this.api = api;
  }

  update = async () => {
    const { users } = await this.api.users.get_users();

    runInAction(() => {
      this.users = users;
    });
  };

  terminate = () => {
    this.users = [];
  };
}

export const UsersStoreContext = createContext<UsersStore | null>(null);

export const useUsersStore = (): UsersStore => {
  const store = useContext(UsersStoreContext);

  if (store === null) throw new Error("PANIC!");

  return store;
};

export type UserModel = {
  user_id: string;
  name: string;
  abbr: string;
  color: string;
};

export type UsersModel = UserModel[];
