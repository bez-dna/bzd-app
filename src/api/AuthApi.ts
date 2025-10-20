import type { API } from "./Api";

export class AuthAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  me = async (): Promise<MeResponse> => {
    return (await this.api.client.get<MeResponse>("/auth/me")).data;
  };

  join = async (data: JoinRequest): Promise<JoinResponse> => {
    return (await this.api.client.post<JoinResponse>("/auth/join", data)).data;
  };

  complete = async (data: CompleteRequest): Promise<CompleteResponse> => {
    return (
      await this.api.client.post<CompleteResponse>("/auth/complete", data)
    ).data;
  };
}

type MeResponse = {
  user: MeResponseUser | null;
};

type MeResponseUser = {
  user_id: string;
  name: string;
  abbr: string;
  color: string;
};

type JoinRequest = {
  phone_number: string;
};

type JoinResponse = {
  verification: JoinResponseVerification;
  is_new: boolean;
};

type JoinResponseVerification = {
  verification_id: string;
};

type CompleteRequest = {
  verification_id: string;
  code: string;
  name: string | null;
};

type CompleteResponse = {
  jwt: string;
};
