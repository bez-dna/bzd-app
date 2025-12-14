import { makeAutoObservable, runInAction } from "mobx";
import { nanoid } from "nanoid";
import { createContext, useContext } from "react";

import type { API } from "../../api/Api";

export class NewMessageStore {
  api: API;

  text: string = "";
  topic_ids: string[] = [];
  code: string = nanoid();
  topics: TopicsModel = [];
  // pending: boolean = false;

  constructor(api: API) {
    makeAutoObservable(this);

    this.api = api;
  }

  updateData = async () => {
    const { topics } = await this.api.topics.get_topics();

    runInAction(() => {
      this.topics = topics;
    });
  };

  setText = (text: string) => {
    this.text = text;
  };

  toggleTopicId = (topic_id: string) => {
    this.topic_ids = this.topic_ids.includes(topic_id)
      ? this.topic_ids.filter((it) => it !== topic_id)
      : [...this.topic_ids, topic_id];
  };

  saveData = async (): Promise<MessageIdModel> => {
    return await this.api.messages
      .create_message({
        text: this.text,
        code: this.code,
        topic_ids: this.topic_ids,
        message_id: null,
      })
      .then((res) => res.message.message_id);
  };
}

export const NewMessageStoreContext = createContext<NewMessageStore | null>(
  null,
);

export const useNewMessageStore = (): NewMessageStore => {
  const newMessageStore = useContext(NewMessageStoreContext);

  if (newMessageStore === null) throw new Error("PANIC!");

  return newMessageStore;
};

export type MessageIdModel = string;

export type TopicModel = {
  topic_id: string;
  title: string;
};

export type TopicsModel = TopicModel[];
