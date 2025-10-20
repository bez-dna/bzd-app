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

  get_sources = async (): Promise<GetSourcesResponse> => {
    return (await this.api.client.get<GetSourcesResponse>("/sources")).data;
  };
}

type GetSourcesResponse = {
  sources: {
    source_id: string;
    user_id: string;
    name: string;
    phone: string;
    abbr: string;
    color: string;
  }[];

  contacts: {
    contact_id: string;
    contact_name: string;
    user_id: string;
    name: string;
    phone: string;
    abbr: string;
    color: string;
  }[];
};

type CreateSourceRequest = {
  user_id: string;
};

type CreateSourceResponse = {
  source_id: string;
};
