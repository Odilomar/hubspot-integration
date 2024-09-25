import { Injectable } from '@nestjs/common';
import { ContactsHubspotApiService } from '../../hubspot/services';
import { GetContactsDto } from '../dtos';

@Injectable()
export class GetContactsUseCaseService {
  constructor(
    private readonly contactsHubspotApiService: ContactsHubspotApiService,
  ) {}

  execute(query: GetContactsDto) {
    return this.contactsHubspotApiService.getContacts(query);
  }
}
