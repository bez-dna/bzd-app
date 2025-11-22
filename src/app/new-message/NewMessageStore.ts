import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { createContext, useContext } from "react";

export class NewMessageStore {
  text: string = "";
  topic_ids: string[] = [];
  code: string = nanoid();
  topics: Topics = [];

  constructor() {
    makeAutoObservable(this);
  }

  setText = (text: string) => {
    this.text = text;
  };

  setTopics = (topics: Topics) => {
    this.topics = topics;
  };

  toggleTopicId = (topic_id: string) => {
    this.topic_ids = this.topic_ids.includes(topic_id)
      ? this.topic_ids.filter((it) => it !== topic_id)
      : [...this.topic_ids, topic_id];
  };

  get form() {
    return {
      text: this.text,
      code: this.code,
      topic_ids: this.topic_ids,
      message_id: null,
    };
  }
}

export const NewMessageStoreContext = createContext<NewMessageStore | null>(
  null,
);

export const useNewMessageStore = (): NewMessageStore => {
  const newMessageStore = useContext(NewMessageStoreContext);

  if (newMessageStore === null) throw new Error("PANIC!");

  return newMessageStore;
};

export type Topic = {
  topic_id: string;
  title: string;
};

export type Topics = Topic[];
