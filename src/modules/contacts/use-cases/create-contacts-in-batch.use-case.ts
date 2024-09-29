import { Injectable } from '@nestjs/common';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { CreateContactDto } from '../dtos';

@Injectable()
export class CreateContactsInBatchUseCase {
  constructor(
    private readonly contactsHubspotApiService: ContactsHubspotApiService,
  ) {}

  execute(contacts: CreateContactDto[]) {
    return this.contactsHubspotApiService.createContactsInBatch(
      contacts.map((contact) => ({ properties: contact })),
    );
  }
}
