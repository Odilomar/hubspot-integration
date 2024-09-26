import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactsInBatchUseCase } from './create-contacts-in-batch.use-case';

describe('CreateContactsInBatchUseCase', () => {
  let service: CreateContactsInBatchUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateContactsInBatchUseCase],
    }).compile();

    service = module.get<CreateContactsInBatchUseCase>(
      CreateContactsInBatchUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
