import type { API } from "./Api";

export class UsersAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_user = async (data: GetUserRequest): Promise<GetUserResponse> => {
    return (
      await this.api.client.get<GetUserResponse>(`/users/${data.user_id}`)
    ).data;
  };

  get_users = async (): Promise<GetUsersResponse> => {
    return (await this.api.client.get<GetUsersResponse>("/users")).data;
  };
}

type GetUsersResponse = {
  sources: {
    source_id: string;

    user: {
      user_id: string;
      name: string;
      phone: string;
      abbr: string;
      color: string;
    };
  }[];

  contacts: {
    contact_id: string;
    contact_name: string;

    user: {
      user_id: string;
      name: string;
      phone: string;
      abbr: string;
      color: string;
    };
  }[];
};

type GetUserRequest = {
  user_id: string;
};

type GetUserResponse = {
  source_id: string;

  user: {
    user_id: string;
    name: string;
    color: string;
    abbr: string;
  };

  topics: {
    topic_id: string;
    title: string;
    topic_user: {
      topic_user_id: string;
    } | null;
  }[];
};
