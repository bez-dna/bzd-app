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

  create_topic_user = async (
    data: CreateTopicUserRequest,
  ): Promise<CreateTopicUserResponse> => {
    return (
      await this.api.client.post<CreateTopicUserResponse>("/topics/users", data)
    ).data;
  };

  delete_topic_user = async (data: DeleteTopicUserRequest): Promise<void> => {
    await this.api.client.delete("/topics/users", { data });
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

type CreateTopicUserRequest = {
  topic_id: string;
};

type CreateTopicUserResponse = {
  topic_user_id: string;
};

type DeleteTopicUserRequest = {
  topic_user_id: string;
};
