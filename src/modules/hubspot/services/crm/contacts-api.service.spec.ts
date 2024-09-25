import { Test, TestingModule } from '@nestjs/testing';
import { ContactsApiServiceService } from './contacts-api.service';

describe('ContactsApiServiceService', () => {
  let service: ContactsApiServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsApiServiceService],
    }).compile();

    service = module.get<ContactsApiServiceService>(ContactsApiServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
