import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";
import type { MainStore } from "./MainStore";

const AUTH_TOKEN = "auth-token";

export class AuthStore {
  mainStore: MainStore;
  token: string | null = null;

  constructor(mainStore: MainStore) {
    makeAutoObservable(this);

    this.mainStore = mainStore;
  }

  initialize = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);

    runInAction(() => {
      this.token = token;
    });

    const data = await this.mainStore.api.auth.me();

    console.log(data);
  };
}
