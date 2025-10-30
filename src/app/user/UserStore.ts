import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class UserStore {
  source: Source | null = null;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setData = (source: Source, user: User) => {
    this.source = source;
    this.user = user;
  };

  clearData = () => {
    this.source = null;
    this.user = null;
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

export type User = {
  user_id: string;
  name: string;
};
