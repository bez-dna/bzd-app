import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { API } from "../api/Api";
import { AuthStore } from "./AuthStore";

export class MainStore {
  initialized = false;
  authStore: AuthStore;
  api: API;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.api = new API(this);
  }

  initialize = async () => {
    await this.authStore.initialize();

    runInAction(() => {
      this.initialized = true;
    });
  };
}

export const MainStoreContext = createContext<MainStore | null>(null);

export const useMainStore = (): MainStore => {
  const mainStore = useContext(MainStoreContext);

  if (mainStore === null) throw new Error("PANIC!");

  return mainStore;
};
