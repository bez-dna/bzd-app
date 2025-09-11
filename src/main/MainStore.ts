import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { API } from "../api/Api";

const JWT = "jwt";

export class MainStore {
  initialized = false;

  jwt: string | null = null;
  user: User | null = null;

  api: API;

  constructor() {
    makeAutoObservable(this);

    // this.authStore = new AuthStore(this);
    this.api = new API(this);
  }

  initialize = async () => {
    const jwt = await AsyncStorage.getItem(JWT);

    this.updateJwt(jwt);

    runInAction(() => {
      this.initialized = true;
    });
  };

  updateJwt = async (jwt: string | null) => {
    if (jwt !== null) {
      await AsyncStorage.setItem(JWT, jwt);
    } else {
      await AsyncStorage.removeItem(JWT);
    }

    runInAction(() => {
      this.jwt = jwt;
    });

    const data = await this.api.auth.me();

    runInAction(() => {
      this.user = data.user;
    });
  };

  get isAuth(): boolean {
    return this.user !== null;
  }
}

export const MainStoreContext = createContext<MainStore | null>(null);

export const useMainStore = (): MainStore => {
  const mainStore = useContext(MainStoreContext);

  if (mainStore === null) throw new Error("PANIC!");

  return mainStore;
};

type User = {
  user_id: string;
};
