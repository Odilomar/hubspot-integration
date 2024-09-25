import { Injectable } from '@nestjs/common';
import { BaseHubspotApiService } from '../base-hubspot-api.service';

@Injectable()
export class ContactsHubspotApiService extends BaseHubspotApiService {
  constructor() {
    super();
  }

  async createContactsInBatch(data: any) {
    return this.hubspotApiClient.crm.contacts.batchApi.create(data);
  }

  async getContacts() {
    return this.hubspotApiClient.crm.contacts.searchApi.doSearch({});
  }
}
