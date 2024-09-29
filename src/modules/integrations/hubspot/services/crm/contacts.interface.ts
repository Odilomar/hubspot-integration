export interface GetContactsApiQuery {
  limit?: number;
  after?: string;
}

export interface CreateContactApi {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  company: string;
  website: string;
}

export interface CreateContactsInBatchApi {
  properties: CreateContactApi;
}
