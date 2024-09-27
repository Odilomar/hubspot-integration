import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetsApiService } from './google-sheets-api.service';

describe('GoogleSheetsApiService', () => {
  let service: GoogleSheetsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetsApiService],
    }).compile();

    service = module.get<GoogleSheetsApiService>(GoogleSheetsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
