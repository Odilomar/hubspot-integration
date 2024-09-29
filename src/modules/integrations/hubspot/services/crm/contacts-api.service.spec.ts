import { Test, TestingModule } from '@nestjs/testing';
import { ContactsHubspotApiService } from './contacts-api.service';

describe('ContactsHubspotApiService', () => {
  let service: ContactsHubspotApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsHubspotApiService],
    }).compile();

    service = module.get<ContactsHubspotApiService>(ContactsHubspotApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
