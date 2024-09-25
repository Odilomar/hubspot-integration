import { Test, TestingModule } from '@nestjs/testing';
import { CreateContactUseCase } from './create-contact.use-case';

describe('CreateContactUseCase', () => {
  let service: CreateContactUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateContactUseCase],
    }).compile();

    service = module.get<CreateContactUseCase>(CreateContactUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
