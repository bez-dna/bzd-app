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

  get_user_messages = async (
    data: CreateUserMessageRequest,
  ): Promise<GetUserMessagesResponse> => {
    const params = data;

    return (
      await this.api.client.get<GetUserMessagesResponse>("/messages", {
        params,
      })
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

type CreateUserMessageRequest = {
  cursor_message_id: string | null;
};

type GetUserMessagesResponse = {
  messages: {
    message_id: string;
    text: string;
  }[];
  cursor_message_id: string;
};
