import type { API } from "./Api";

export class AuthAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  me = async (): Promise<MeResponse> => {
    return (await this.api.client.get("/api/auth/me")).data;
  };

  // join = async (data: JoinRequestData): Promise<JoinResponseData> => {
  //   return (
  //     await this.api.client.post<JoinResponseData>("/api/auth/join", data)
  //   ).data;
  // };
}

type MeResponse = {
  user: MeResponseUser | null;
};

type MeResponseUser = {
  user_id: string;
};
