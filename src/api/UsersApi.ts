import type { API, RATE, TIMING } from "./Api";

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

  get_user_topics = async (
    data: GetUserTopicsRequest,
  ): Promise<GetUserTopicsResponse> => {
    return (
      await this.api.client.get<GetUserTopicsResponse>(
        `/users/${data.user_id}/topics`,
      )
    ).data;
  };

  get_users = async (): Promise<GetUsersResponse> => {
    return (await this.api.client.get<GetUsersResponse>("/users")).data;
  };
}

type GetUsersResponse = {
  users: {
    user_id: string;
    name: string;
    abbr: string;
    color: string;
  }[];
};

type GetUserRequest = {
  user_id: string;
};

type GetUserResponse = {
  user: {
    user_id: string;
    name: string;
    color: string;
    abbr: string;
  };
};

type GetUserTopicsRequest = {
  user_id: string;
};

type GetUserTopicsResponse = {
  topics: {
    topic_id: string;
    title: string;
    topic_user: {
      topic_user_id: string;
      rate: RATE;
      timing: TIMING;
    } | null;
  }[];
};
