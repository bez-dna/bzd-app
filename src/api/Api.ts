import axios, { type AxiosInstance } from "axios";
import Config from "react-native-config";
import { type MainStore, useMainStore } from "../app/main/MainStore";
import { AuthAPI } from "./AuthApi";
import { ContactsAPI } from "./ContactsApi";
import { MessagesAPI } from "./MessagesApi";
import { SourcesAPI } from "./SourcesApi";
import { TopicsAPI } from "./TopicsApi";

export class API {
  mainStore: MainStore;
  client: AxiosInstance;
  auth: AuthAPI;
  topics: TopicsAPI;
  messages: MessagesAPI;
  contacts: ContactsAPI;
  sources: SourcesAPI;

  constructor(mainStore: MainStore) {
    this.mainStore = mainStore;

    this.client = axios.create({
      baseURL: Config.API_URL,
      adapter: "fetch",
    });

    this.auth = new AuthAPI(this);
    this.topics = new TopicsAPI(this);
    this.messages = new MessagesAPI(this);
    this.contacts = new ContactsAPI(this);
    this.sources = new SourcesAPI(this);

    this.client.interceptors.request.use((config) => {
      if (this.mainStore.jwt !== null) {
        config.headers.Authorization = `Bearer ${this.mainStore.jwt}`;
      }

      return config;
    });

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (_) => {
        this.mainStore.setError();
      },
    );
  }
}

export const useAPI = (): API => {
  const mainStore = useMainStore();

  return mainStore.api;
};
