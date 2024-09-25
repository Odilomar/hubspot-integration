import { Test, TestingModule } from '@nestjs/testing';
import { GetContactsUseCaseService } from './get-contacts.use-case';

describe('GetContactsUseCaseService', () => {
  let service: GetContactsUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetContactsUseCaseService],
    }).compile();

    service = module.get<GetContactsUseCaseService>(GetContactsUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
