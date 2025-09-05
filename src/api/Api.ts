import axios, { AxiosInstance } from "axios";
import { MainStore } from "../main/MainStore";
import { createContext, useContext } from "react";
import { AuthAPI } from "./AuthApi";
import Config from "react-native-config";

export class API {
  mainStore: MainStore
  client: AxiosInstance;
  apiUrl = Config.API_URL
  auth: AuthAPI;

  constructor(mainStore: MainStore) {
    this.mainStore = mainStore


    this.client = axios.create({
      adapter: "fetch",
    });

    this.auth = new AuthAPI(this);

    // this.client.interceptors.request.use((config) => {
    //   if (this.rootStore.token !== null) {
    //     config.headers.Authorization = `Bearer ${this.rootStore.token}`;
    //   }

    //   config.headers.Locale = i18nStore.locale;

    //   return config;
    // });
  }
}


export const APIContext = createContext<API | null>(null)

export const useAPI = (): API => {
    const api = useContext(APIContext)

    if (api === null) throw new Error("PANIC!")

    return api
}
