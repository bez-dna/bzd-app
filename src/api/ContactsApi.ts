import type { API } from "./Api";

export class ContactsAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_contacts = async (data: CreateContactsRequest): Promise<void> => {
    await this.api.client.post("/contacts", data);
  };
}

type CreateContactsRequest = {
  contacts: {
    phone_number: string;
    name: string;
    device_contact_id: string;
  }[];
};
