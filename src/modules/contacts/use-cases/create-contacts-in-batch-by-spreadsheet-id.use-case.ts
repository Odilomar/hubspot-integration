import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { GoogleSheetsApiService } from '../../integrations/google/services';
import {
  Contact,
  NO_CONTACTS_FOUND_IN_SPREADSHEET,
  NO_CONTACTS_TO_CREATE,
} from '../shared';

@Injectable()
export class CreateContactsInBatchBySpreadsheetIdUseCase {
  constructor(
    private readonly contactsHubspotApiService: ContactsHubspotApiService,
    private readonly googleSheetsApiService: GoogleSheetsApiService,
  ) {}

  async execute(spreadsheetId: string) {
    const contacts =
      await this.googleSheetsApiService.getSpreadsheetValuesById<Contact>(
        spreadsheetId,
      );

    if (contacts.length === 0) {
      throw new BadRequestException(NO_CONTACTS_FOUND_IN_SPREADSHEET);
    }

    const contactsToCreate = contacts.filter(({ website, email }) => {
      const companyDomain = new URL(website).hostname.replace(/^www\./, '');

      return email.includes(`@${companyDomain}`);
    });

    if (contactsToCreate.length === 0) {
      throw new Error(NO_CONTACTS_TO_CREATE);
    }

    await this.contactsHubspotApiService.createContactsInBatch(
      contactsToCreate.map((contact) => ({ properties: contact })),
    );

    return {
      message: 'Contacts created successfully!',
      totalContactsCreated: contactsToCreate.length,
      contactsCreated: contactsToCreate,
    };
  }
}
