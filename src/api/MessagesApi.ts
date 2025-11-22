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
    data: GetUserMessageRequest,
  ): Promise<GetUserMessagesResponse> => {
    const params = data;

    return (
      await this.api.client.get<GetUserMessagesResponse>("/messages", {
        params,
      })
    ).data;
  };

  get_message_messages = async (
    data: GetMessageMessageRequest,
  ): Promise<GetMessageMessagesResponse> => {
    const { message_id, ...params } = data;

    return (
      await this.api.client.get<GetMessageMessagesResponse>(
        `/messages/${message_id}/messages`,
        {
          params,
        },
      )
    ).data;
  };
}

type CreateMessageRequest = {
  topic_ids: string[] | null;
  message_id: string | null;
  text: string;
  code: string;
};

type CreateMessageResponse = {
  message: {
    message_id: string;
  };
};

type GetUserMessageRequest = {
  cursor_message_id: string | null;
};

type GetUserMessagesResponse = {
  messages: {
    message_id: string;
    text: string;
  }[];
  cursor_message_id: string;
};

type GetMessageMessageRequest = {
  message_id: string;
  cursor_message_id: string | null;
};

type GetMessageMessagesResponse = {
  messages: {
    message_id: string;
    text: string;
  }[];
  cursor_message_id: string;
};
