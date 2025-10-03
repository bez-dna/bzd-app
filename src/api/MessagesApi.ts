import type { API } from "./Api";

export class MessagesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_message = async (
    data: CreateMessageRequest,
  ): Promise<CreateMessageResponse> => {
    return (
      await this.api.client.post<CreateMessageResponse>("/messages", data)
    ).data;
  };
}

type CreateMessageRequest = {
  topic_ids: string[];
  text: string;
  code: string;
};

type CreateMessageResponse = {
  message: {
    message_id: string;
  };
};
