import { Test, TestingModule } from '@nestjs/testing';
import { ContactsHubspotApiService } from './contacts-api.service';
import { BaseHubspotApiService } from '../base-hubspot-api.service';
import {
  CreateContactsInBatchApi,
  GetContactsApiQuery,
} from './contacts.interface';

jest.mock('@hubspot/api-client', () => ({
  Client: jest.fn().mockImplementation(() => ({
    crm: {
      contacts: {
        batchApi: {
          create: jest.fn(),
        },
        basicApi: {
          create: jest.fn(),
        },
        searchApi: {
          doSearch: jest.fn(),
        },
      },
    },
  })),
}));

describe('ContactsHubspotApiService', () => {
  let service: ContactsHubspotApiService;

  const MOCK_CONTACT_1 = {
    email: 'jane.doe@hubspot.com',
    firstname: 'Jane',
    lastname: 'Doe',
    phone: '(555) 555-5555',
    company: 'HubSpot',
    website: 'https://www.hubspot.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsHubspotApiService, BaseHubspotApiService],
    }).compile();

    service = module.get<ContactsHubspotApiService>(ContactsHubspotApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createContactsInBatch', () => {
    it('should call create contacts in batch with correct parameters', async () => {
      const contacts: CreateContactsInBatchApi[] = [
        {
          properties: MOCK_CONTACT_1,
        },
      ];

      const createSpy = jest
        .spyOn(service['hubspotApiClient'].crm.contacts.batchApi, 'create')
        .mockResolvedValue({} as any);

      await service.createContactsInBatch(contacts);

      expect(createSpy).toHaveBeenCalledWith({ inputs: contacts });
    });
  });

  describe('getContacts', () => {
    it('should call search contacts with correct parameters', async () => {
      const query: GetContactsApiQuery = {
        limit: 10,
        after: '',
      };

      const searchSpy = jest
        .spyOn(service['hubspotApiClient'].crm.contacts.searchApi, 'doSearch')
        .mockResolvedValue({ totals: 0, results: [] } as any);

      await service.getContacts(query);

      expect(searchSpy).toHaveBeenCalledWith(query);
    });
  });
});
