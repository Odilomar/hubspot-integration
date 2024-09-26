import { Injectable } from '@nestjs/common';
import { BaseHubspotApiService } from '../base-hubspot-api.service';
import {
  CreateContactApi,
  CreateContactsInBatchApi,
  GetContactsApiQuery,
} from './contacts.interface';
import { Dict } from '../../../../shared';
import { SimplePublicObjectInputForCreate } from '@hubspot/api-client/lib/codegen/crm/companies';

@Injectable()
export class ContactsHubspotApiService extends BaseHubspotApiService {
  constructor() {
    super();
  }

  async createContactsInBatch(contacts: CreateContactsInBatchApi[]) {
    return this.hubspotApiClient.crm.contacts.batchApi.create({
      inputs: contacts as unknown as SimplePublicObjectInputForCreate[],
    });
  }

  async createContact(contact: CreateContactApi) {
    return this.hubspotApiClient.crm.contacts.basicApi.create({
      properties: contact as unknown as Dict<string>,
    });
  }

  async getContacts(query: GetContactsApiQuery) {
    return this.hubspotApiClient.crm.contacts.searchApi.doSearch(query);
  }
}
