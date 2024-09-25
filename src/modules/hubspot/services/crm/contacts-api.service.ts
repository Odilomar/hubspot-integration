import { Injectable } from '@nestjs/common';
import { BaseHubspotApiService } from '../base-hubspot-api.service';
import { GetContactsApiQuery } from './contacts.interface';

@Injectable()
export class ContactsHubspotApiService extends BaseHubspotApiService {
  constructor() {
    super();
  }

  async createContactsInBatch(data: any) {
    return this.hubspotApiClient.crm.contacts.batchApi.create(data);
  }

  async getContacts(query: GetContactsApiQuery) {
    return this.hubspotApiClient.crm.contacts.searchApi.doSearch(query);
  }
}
