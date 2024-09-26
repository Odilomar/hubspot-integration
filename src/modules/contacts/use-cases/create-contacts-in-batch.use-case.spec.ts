import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactsInBatchUseCase } from './create-contacts-in-batch.use-case';
import { CreateContactDto } from '../dtos';
import { ContactsHubspotApiService } from '../../hubspot/services';

describe('CreateContactsInBatchUseCase', () => {
  let service: CreateContactsInBatchUseCase;
  let contactsHubspotApiService: ContactsHubspotApiService;

  const mockContacts: CreateContactDto[] = [
    {
      email: 'jane.doe@hubspot.com',
      firstname: 'Jane',
      lastname: 'Doe',
      phone: '(555) 555-5555',
      company: 'HubSpot',
      website: 'https://www.hubspot.com',
    },
    {
      email: 'john.smith@hubspot.com',
      firstname: 'John',
      lastname: 'Smith',
      phone: '(555) 555-1234',
      company: 'HubSpot',
      website: 'https://www.hubspot.com',
    },
    {
      email: 'alice.jones@hubspot.com',
      firstname: 'Alice',
      lastname: 'Jones',
      phone: '(555) 555-6789',
      company: 'HubSpot',
      website: 'https://www.hubspot.com',
    },
  ];

  const mockResult = {
    status: 'success',
    total: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactsInBatchUseCase,
        {
          provide: ContactsHubspotApiService,
          useValue: {
            createContactsInBatch: jest.fn().mockResolvedValue(mockResult),
          },
        },
      ],
    }).compile();

    service = module.get<CreateContactsInBatchUseCase>(
      CreateContactsInBatchUseCase,
    );
    contactsHubspotApiService = module.get<ContactsHubspotApiService>(
      ContactsHubspotApiService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create contacts in batch', () => {
    expect(service.execute(mockContacts)).resolves.toEqual(mockResult);

    expect(
      contactsHubspotApiService.createContactsInBatch,
    ).toHaveBeenCalledWith(
      mockContacts.map((contact) => ({ properties: contact })),
    );
  });

  describe('when the HubSpot API service fails', () => {
    it('should throw an error', () => {
      const error = new Error('Internal Server Error');

      jest
        .spyOn(contactsHubspotApiService, 'createContactsInBatch')
        .mockRejectedValue(error);

      expect(service.execute(mockContacts)).rejects.toEqual(error);
    });
  });
});
