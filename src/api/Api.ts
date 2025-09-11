import axios, { type AxiosInstance } from "axios";
import { createContext, useContext } from "react";
import Config from "react-native-config";
import { type MainStore, useMainStore } from "../main/MainStore";
import { AuthAPI } from "./AuthApi";

export class API {
  mainStore: MainStore;
  client: AxiosInstance;
  auth: AuthAPI;

  constructor(mainStore: MainStore) {
    this.mainStore = mainStore;

    this.client = axios.create({
      baseURL: Config.API_URL,
      adapter: "fetch",
    });

    this.auth = new AuthAPI(this);

    this.client.interceptors.request.use((config) => {
      if (this.mainStore.jwt !== null) {
        config.headers.Authorization = `Bearer ${this.mainStore.jwt}`;
      }

      //   config.headers.Locale = i18nStore.locale;

      return config;
    });

    this.client.interceptors.request.use((request) => {
      console.log("Starting Request", JSON.stringify(request, null, 2));
      return request;
    });

    this.client.interceptors.response.use((response) => {
      console.log("Response:", JSON.stringify(response, null, 2));
      return response;
    });
  }
}

export const useAPI = (): API => {
  const mainStore = useMainStore();

  return mainStore.api;
};
