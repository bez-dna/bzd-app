import type { API } from "./Api";

export class AuthAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  me = async (): Promise<MeResponse> => {
    return (await this.api.client.get<MeResponse>("/api/auth/me")).data;
  };

  join = async (data: JoinRequest): Promise<JoinResponse> => {
    return (await this.api.client.post<JoinResponse>("/api/auth/join", data))
      .data;
  };

  complete = async (data: CompleteRequest): Promise<CompleteResponse> => {
    return (
      await this.api.client.post<CompleteResponse>("/api/auth/complete", data)
    ).data;
  };
}

type MeResponse = {
  user: MeResponseUser | null;
};

type MeResponseUser = {
  user_id: string;
};

type JoinRequest = {
  phone_number: string;
};

type JoinResponse = {
  verification: JoinResponseVerification;
};

type JoinResponseVerification = {
  verification_id: string;
};

type CompleteRequest = {
  verification_id: string;
  code: string;
};

type CompleteResponse = {
  jwt: string;
};
