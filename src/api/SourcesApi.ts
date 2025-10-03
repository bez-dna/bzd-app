import type { API } from "./Api";

export class SourcesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_sources = async (): Promise<GetSourcesResponse> => {
    return (await this.api.client.get<GetSourcesResponse>("/sources")).data;
  };
}

type GetSourcesResponse = {
  sources: {
    source_id: string;
    title: string;
  }[];
};
