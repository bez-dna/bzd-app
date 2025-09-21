import type { API } from "./Api";

export class TopicsAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_topics = async (): Promise<GetTopicsResponse> => {
    return (await this.api.client.get<GetTopicsResponse>("/topics")).data;
  };

  create_topic = async (
    data: CreateTopicRequest,
  ): Promise<CreateTopicResponse> => {
    return (await this.api.client.post<CreateTopicResponse>("/topics", data))
      .data;
  };
}

type GetTopicsResponse = {
  topics: {
    topic_id: string;
    title: string;
  }[];
};

type CreateTopicResponse = {
  topic: {
    topic_id: string;
  };
};

type CreateTopicRequest = {
  title: string;
};
