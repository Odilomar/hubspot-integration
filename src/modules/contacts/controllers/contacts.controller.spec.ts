import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { CreateContactUseCase, GetContactsUseCase } from '../use-cases';
import { CreateContactsInBatchUseCase } from '../use-cases/create-contacts-in-batch.use-case';
import { CreateContactsInBatchBySpreadsheetIdUseCase } from '../use-cases/create-contacts-in-batch-by-spreadsheet-id.use-case';
import { CreateContactDto, GetContactsDto } from '../dtos';

describe('ContactsController', () => {
  let contactsController: ContactsController;
  let getContactsUseCase: GetContactsUseCase;
  let createContactUseCase: CreateContactUseCase;
  let createContactsInBatchUseCase: CreateContactsInBatchUseCase;
  let createContactsInBatchBySpreadsheetIdUseCase: CreateContactsInBatchBySpreadsheetIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: GetContactsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateContactUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateContactsInBatchUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: CreateContactsInBatchBySpreadsheetIdUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    contactsController = module.get<ContactsController>(ContactsController);
    getContactsUseCase = module.get<GetContactsUseCase>(GetContactsUseCase);
    createContactUseCase =
      module.get<CreateContactUseCase>(CreateContactUseCase);
    createContactsInBatchUseCase = module.get<CreateContactsInBatchUseCase>(
      CreateContactsInBatchUseCase,
    );
    createContactsInBatchBySpreadsheetIdUseCase =
      module.get<CreateContactsInBatchBySpreadsheetIdUseCase>(
        CreateContactsInBatchBySpreadsheetIdUseCase,
      );
  });

  it('should be defined', () => {
    expect(contactsController).toBeDefined();
  });

  describe('getContacts', () => {
    it('should call getContactsUseCase.execute with correct parameters', async () => {
      const query: GetContactsDto = { after: '1', limit: 10 };
      await contactsController.getContacts(query);
      expect(getContactsUseCase.execute).toHaveBeenCalledWith(query);
    });
  });

  describe('createContact', () => {
    it('should call createContactUseCase.execute with correct parameters', async () => {
      const body: CreateContactDto = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        company: 'Doe Inc.',
        website: 'http://doeinc.com',
      };
      await contactsController.createContact(body);
      expect(createContactUseCase.execute).toHaveBeenCalledWith(body);
    });
  });

  describe('createContactsInBatch', () => {
    it('should call createContactsInBatchUseCase.execute with correct parameters', async () => {
      const body: CreateContactDto[] = [
        {
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'jane.doe@example.com',
          phone: '0987654321',
          company: 'Doe Inc.',
          website: 'http://doeinc.com',
        },
        {
          firstname: 'Alice',
          lastname: 'Smith',
          email: 'alice.smith@example.com',
          phone: '1122334455',
          company: 'Smith LLC',
          website: 'http://smithllc.com',
        },
      ];
      await contactsController.createContactsInBatch(body);
      expect(createContactsInBatchUseCase.execute).toHaveBeenCalledWith(body);
    });
  });

  describe('createContactsInBatchBySpreadsheetId', () => {
    it('should call createContactsInBatchBySpreadsheetIdUseCase.execute with correct parameters', async () => {
      const spreadsheetId = 'spreadsheet123';
      await contactsController.createContactsInBatchBySpreadsheetId(
        spreadsheetId,
      );
      expect(
        createContactsInBatchBySpreadsheetIdUseCase.execute,
      ).toHaveBeenCalledWith(spreadsheetId);
    });
  });
});
