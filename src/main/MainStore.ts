import { makeAutoObservable, runInAction } from "mobx"
import { createContext, useContext } from "react"
import { AuthStore } from "./AuthStore"
import { API } from "../api/Api"

export class MainStore {
    initialized = false
    authStore: AuthStore
    api: API

    constructor() {
        makeAutoObservable(this)

        this.authStore = new AuthStore(this)
        this.api = new API(this)
    }

  initialize = async () => {
      // this.workerStore.initialize();
      console.log("MAIN INITED STARTED")
      await this.authStore.initialize();
      console.log("AUTH INIT STOPPED")

      runInAction(() => {
        console.log("MAIN INITED")
      this.initialized = true;
    });
  };
}

export const MainStoreContext = createContext<MainStore | null>(null)

export const useMainStore = (): MainStore => {
    const mainStore = useContext(MainStoreContext)

    if (mainStore === null) throw new Error("PANIC!")

    return mainStore
}
