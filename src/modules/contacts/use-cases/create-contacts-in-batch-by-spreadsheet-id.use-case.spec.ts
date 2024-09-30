import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateContactsInBatchBySpreadsheetIdUseCase } from './create-contacts-in-batch-by-spreadsheet-id.use-case';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { GoogleSheetsApiService } from '../../integrations/google/services';
import {
  NO_CONTACTS_FOUND_IN_SPREADSHEET,
  NO_CONTACTS_TO_CREATE,
} from '../shared';

describe('CreateContactsInBatchBySpreadsheetIdUseCase', () => {
  let useCase: CreateContactsInBatchBySpreadsheetIdUseCase;
  let contactsHubspotApiService: ContactsHubspotApiService;
  let googleSheetsApiService: GoogleSheetsApiService;

  const spreadsheetId = 'test-spreadsheet-id';

  const CONTACT_1 = {
    website: 'http://example.com',
    email: 'contact@example.com',
  };

  const CONTACT_2 = {
    website: 'http://example.com',
    email: 'another@example.com',
  };

  const CONTACT_3 = {
    website: 'http://example-1.com',
    email: 'another1@example.com',
  };
  const mockedContacts = [CONTACT_1, CONTACT_2, CONTACT_3];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactsInBatchBySpreadsheetIdUseCase,
        {
          provide: ContactsHubspotApiService,
          useValue: {
            createContactsInBatch: jest.fn(),
          },
        },
        {
          provide: GoogleSheetsApiService,
          useValue: {
            getSpreadsheetValuesById: jest
              .fn()
              .mockResolvedValue(mockedContacts),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateContactsInBatchBySpreadsheetIdUseCase>(
      CreateContactsInBatchBySpreadsheetIdUseCase,
    );
    contactsHubspotApiService = module.get<ContactsHubspotApiService>(
      ContactsHubspotApiService,
    );
    googleSheetsApiService = module.get<GoogleSheetsApiService>(
      GoogleSheetsApiService,
    );
  });

  it('should create contacts successfully', async () => {
    const result = await useCase.execute(spreadsheetId);

    expect(result).toEqual({
      message: 'Contacts created successfully!',
      totalContactsCreated: 2,
      contactsCreated: [CONTACT_1, CONTACT_2],
    });

    expect(
      contactsHubspotApiService.createContactsInBatch,
    ).toHaveBeenCalledWith(
      [CONTACT_1, CONTACT_2].map((contact) => ({ properties: contact })),
    );
  });

  describe('when it throws an error', () => {
    it('should throw BadRequestException when no contacts found in spreadsheet', async () => {
      jest
        .spyOn(googleSheetsApiService, 'getSpreadsheetValuesById')
        .mockResolvedValue([]);

      await expect(useCase.execute(spreadsheetId)).rejects.toThrow(
        BadRequestException,
      );
      await expect(useCase.execute(spreadsheetId)).rejects.toThrow(
        NO_CONTACTS_FOUND_IN_SPREADSHEET,
      );
    });

    it('should throw error when no contacts to create', async () => {
      jest
        .spyOn(googleSheetsApiService, 'getSpreadsheetValuesById')
        .mockResolvedValue([CONTACT_3]);

      await expect(useCase.execute(spreadsheetId)).rejects.toThrow(Error);
      await expect(useCase.execute(spreadsheetId)).rejects.toThrow(
        NO_CONTACTS_TO_CREATE,
      );
    });
  });
});
