import { Injectable } from '@nestjs/common';
import { BaseHubspotApiService } from '../base-hubspot-api.service';
import { CreateContactApi, GetContactsApiQuery } from './contacts.interface';
import { Dict } from '../../../../shared';

@Injectable()
export class ContactsHubspotApiService extends BaseHubspotApiService {
  constructor() {
    super();
  }

  // async createContactsInBatch(data: any) {
  //   return this.hubspotApiClient.crm.contacts.batchApi.create(data);
  // }

  async createContact(contact: CreateContactApi) {
    console.log({ contact });
    return this.hubspotApiClient.crm.contacts.basicApi.create({
      properties: contact as unknown as Dict<string>,
    });
  }

  async getContacts(query: GetContactsApiQuery) {
    return this.hubspotApiClient.crm.contacts.searchApi.doSearch(query);
  }
}
