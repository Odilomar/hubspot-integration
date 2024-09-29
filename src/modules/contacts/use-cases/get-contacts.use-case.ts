import { Injectable } from '@nestjs/common';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { GetContactsDto } from '../dtos';

@Injectable()
export class GetContactsUseCase {
  constructor(
    private readonly contactsHubspotApiService: ContactsHubspotApiService,
  ) {}

  execute(query: GetContactsDto) {
    return this.contactsHubspotApiService.getContacts(query);
  }
}
