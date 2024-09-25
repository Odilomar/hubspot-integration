import { Test, TestingModule } from '@nestjs/testing';
import { GetContactsUseCase } from './get-contacts.use-case';

describe('GetContactsUseCase', () => {
  let service: GetContactsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetContactsUseCase],
    }).compile();

    service = module.get<GetContactsUseCase>(GetContactsUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
