import { API } from "./Api";

export class AuthAPI {
  api: API;

  constructor(api: API) {
    this.api = api;

    console.log("API")
    console.log(api)
  }

  me = async (): Promise<MeResponse> => {
    return (await this.api.client.get(this.api.apiUrl  + "/api/auth/me")).data;
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
