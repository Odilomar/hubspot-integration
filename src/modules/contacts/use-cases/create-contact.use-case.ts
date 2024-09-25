import { Injectable } from '@nestjs/common';
import { ContactsHubspotApiService } from '../../hubspot/services';
import { CreateContactDto } from '../dtos';

@Injectable()
export class CreateContactUseCase {
  constructor(
    private readonly contactsHubspotApiService: ContactsHubspotApiService,
  ) {}

  execute(contact: CreateContactDto) {
    return this.contactsHubspotApiService.createContact(contact);
  }
}
