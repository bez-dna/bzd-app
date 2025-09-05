import { makeAutoObservable, runInAction } from "mobx"
import { createContext, useContext } from "react"
import { MainStore } from "./MainStore"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AUTH_TOKEN = "auth-token"

export class AuthStore {
  mainStore: MainStore
  token: String | null = null

    constructor(mainStore: MainStore) {
      makeAutoObservable(this)

        this.mainStore = mainStore
    }

  initialize = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);

    // this.workerStore.initialize();
    // await this.authStore.initialize();

    runInAction(() => {
      this.token = token
      // this.initialized = true;
    });

    const data = await this.mainStore.api.auth.me()

    console.log(data)
  };
}
