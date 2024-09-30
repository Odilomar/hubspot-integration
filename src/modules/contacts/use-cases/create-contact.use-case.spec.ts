import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactUseCase } from './create-contact.use-case';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { CreateContactDto } from '../dtos';

describe('CreateContactUseCase', () => {
  let createContactUseCase: CreateContactUseCase;
  let contactsHubspotApiService: ContactsHubspotApiService;

  const MOCK_CONTACT: CreateContactDto = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    company: 'Example Inc.',
    website: 'https://example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContactUseCase,
        {
          provide: ContactsHubspotApiService,
          useValue: {
            createContact: jest.fn().mockResolvedValue(MOCK_CONTACT),
          },
        },
      ],
    }).compile();

    createContactUseCase =
      module.get<CreateContactUseCase>(CreateContactUseCase);
    contactsHubspotApiService = module.get<ContactsHubspotApiService>(
      ContactsHubspotApiService,
    );
  });

  it('should be defined', () => {
    expect(createContactUseCase).toBeDefined();
  });

  it('should call create contact', async () => {
    const results = await createContactUseCase.execute(MOCK_CONTACT);

    expect(results).toBe(MOCK_CONTACT);
    expect(contactsHubspotApiService.createContact).toHaveBeenCalledWith(
      MOCK_CONTACT,
    );
  });

  describe('when it throws an error', () => {
    it('fails when contactsHubspotApiService.createContact throws an error', async () => {
      const mockError = new Error('Test error');

      jest
        .spyOn(contactsHubspotApiService, 'createContact')
        .mockRejectedValueOnce(mockError);

      await expect(createContactUseCase.execute(MOCK_CONTACT)).rejects.toThrow(
        mockError,
      );
    });
  });
});
