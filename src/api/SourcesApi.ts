import type { API } from "./Api";

export class SourcesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_source = async (
    data: CreateSourceRequest,
  ): Promise<CreateSourceResponse> => {
    return (await this.api.client.post<CreateSourceResponse>("/sources", data))
      .data;
  };
}

type CreateSourceRequest = {
  user_id: string;
};

type CreateSourceResponse = {
  source_id: string;
};
