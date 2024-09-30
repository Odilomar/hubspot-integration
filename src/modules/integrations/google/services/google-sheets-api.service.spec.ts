import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetsApiService } from './google-sheets-api.service';
import { BaseGoogleApiService } from './base-google-api.service';
import { sheets_v4 } from '@googleapis/sheets';
import { google } from 'googleapis';

jest.mock('googleapis', () => ({
  google: {
    auth: {
      GoogleAuth: jest.fn().mockImplementation(() => ({
        getClient: jest.fn(),
      })),
    },
    sheets: jest.fn().mockReturnValue({
      spreadsheets: {
        get: jest.fn(),
        values: {
          get: jest.fn(),
        },
      },
    }),
  },
}));

describe('GoogleSheetsApiService', () => {
  let service: GoogleSheetsApiService;
  let sheetsMock: jest.Mocked<sheets_v4.Sheets>;

  const spreadsheetId = 'test-spreadsheet-id';
  const sheetTitle = 'Sheet1';
  const rowCount = 10;
  const columns = ['Name', 'Age'];
  const values = [
    ['John', '30'],
    ['Jane', '25'],
  ];

  type Result = {
    Name: string;
    Age: string;
  };

  const MOCK_SPREADSHEET_DETAILS = {
    data: {
      sheets: [
        {
          properties: {
            title: sheetTitle,
            gridProperties: {
              rowCount,
            },
          },
        },
      ],
    },
  };

  const MOCK_SPREADSHEET_VALUE = {
    data: {
      values: [columns, ...values],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetsApiService, BaseGoogleApiService],
    }).compile();

    service = module.get<GoogleSheetsApiService>(GoogleSheetsApiService);
    sheetsMock = google.sheets({
      version: 'v4',
    }) as jest.Mocked<sheets_v4.Sheets>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSpreadsheetById', () => {
    it('should call sheets.spreadsheets.get with correct parameters', async () => {
      await service.getSpreadsheetById(spreadsheetId);

      expect(sheetsMock.spreadsheets.get).toHaveBeenCalledWith({
        spreadsheetId,
      });
    });
  });

  describe('getSpreadsheetDetailsById', () => {
    it('should call sheets.spreadsheets.values.get with correct parameters', async () => {
      (sheetsMock.spreadsheets.get as jest.Mock).mockResolvedValueOnce(
        MOCK_SPREADSHEET_DETAILS,
      );

      await service.getSpreadsheetDetailsById(spreadsheetId);

      expect(sheetsMock.spreadsheets.values.get).toHaveBeenCalledWith({
        spreadsheetId,
        range: `${sheetTitle}!A1:Z${rowCount}`,
      });
    });
  });

  describe('getSpreadsheetValuesById', () => {
    beforeEach(() => {
      (sheetsMock.spreadsheets.get as jest.Mock).mockResolvedValueOnce(
        MOCK_SPREADSHEET_DETAILS,
      );
    });

    it('should return an array of objects with correct values', async () => {
      (sheetsMock.spreadsheets.values.get as jest.Mock).mockResolvedValueOnce(
        MOCK_SPREADSHEET_VALUE,
      );

      const result =
        await service.getSpreadsheetValuesById<Result>(spreadsheetId);

      expect(result).toEqual([
        { Name: 'John', Age: '30' },
        { Name: 'Jane', Age: '25' },
      ]);
    });

    it('should return an empty array if no values are found', async () => {
      const spreadsheetId = 'test-spreadsheet-id';

      (sheetsMock.spreadsheets.values.get as jest.Mock).mockResolvedValueOnce({
        data: {
          values: [],
        },
      } as any);

      const result =
        await service.getSpreadsheetValuesById<Result>(spreadsheetId);

      expect(result).toEqual([]);
    });
  });
});
