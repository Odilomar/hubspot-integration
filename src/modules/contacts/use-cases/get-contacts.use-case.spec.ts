import { Test, TestingModule } from '@nestjs/testing';
import { GetContactsUseCase } from './get-contacts.use-case';
import { ContactsHubspotApiService } from '../../integrations/hubspot/services';
import { GetContactsDto } from '../dtos';

describe('GetContactsUseCase', () => {
  let getContactsUseCase: GetContactsUseCase;
  let contactsHubspotApiService: ContactsHubspotApiService;

  const query: GetContactsDto = {
    after: '1',
    limit: 10,
  };

  const CONTACTS = {
    total: 1,
    results: [
      {
        createdAt: '2024-09-25T19:47:48.430Z',
        archived: false,
        id: '61863742886',
        properties: {
          createdate: '2024-09-25T19:47:48.430Z',
          email: 'emailmaria@hubspot.com',
          firstname: 'Maria',
          hs_object_id: '61863742886',
          lastmodifieddate: '2024-09-25T19:48:07.197Z',
          lastname: 'Johnson (Sample Contact)',
        },
        updatedAt: '2024-09-25T19:48:07.197Z',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetContactsUseCase,
        {
          provide: ContactsHubspotApiService,
          useValue: {
            getContacts: jest.fn().mockResolvedValue(CONTACTS),
          },
        },
      ],
    }).compile();

    getContactsUseCase = module.get<GetContactsUseCase>(GetContactsUseCase);
    contactsHubspotApiService = module.get<ContactsHubspotApiService>(
      ContactsHubspotApiService,
    );
  });

  it('should be defined', () => {
    expect(getContactsUseCase).toBeDefined();
  });

  it('should call getContacts method of ContactsHubspotApiService with correct parameters', async () => {
    const result = await getContactsUseCase.execute(query);

    expect(result).toBe(CONTACTS);
    expect(contactsHubspotApiService.getContacts).toHaveBeenCalledWith(query);
  });

  describe('when it throws an error', () => {
    it('fails when contactsHubspotApiService.getContacts throws an error', async () => {
      const error = new Error('Some error');

      jest
        .spyOn(contactsHubspotApiService, 'getContacts')
        .mockRejectedValue(error);

      await expect(getContactsUseCase.execute(query)).rejects.toThrow(
        'Some error',
      );
    });
  });
});
