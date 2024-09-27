import { sheets_v4 } from '@googleapis/sheets';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Dict } from '../../../shared';
import { BaseGoogleApiService } from './base-google-api.service';

@Injectable()
export class GoogleSheetsApiService extends BaseGoogleApiService {
  private sheets: sheets_v4.Sheets;

  constructor() {
    super();

    this.init();
  }

  async init() {
    const authClient = await this.authorize();

    this.sheets = google.sheets({ version: 'v4', auth: authClient as any });
  }

  async getSpreadsheetById(spreadsheetId: string) {
    return this.sheets.spreadsheets.get({
      spreadsheetId,
    });
  }

  async getSpreadsheetDetailsById(spreadsheetId: string) {
    const spreadsheets = await this.getSpreadsheetById(spreadsheetId);

    const sheet = spreadsheets.data.sheets[0];
    const range =
      sheet.properties.title +
      `!A1:Z${sheet.properties.gridProperties.rowCount}`;

    return this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  }

  async getSpreadsheetValuesById(spreadsheetId: string) {
    const res = await this.getSpreadsheetDetailsById(spreadsheetId);

    const values: Array<string[]> = res.data.values || [];

    if (!values.length) {
      return {};
    }

    const columns = values.shift();

    return values.map((row) =>
      row.reduce((acc, cell, index) => {
        acc[columns[index]] = cell;
        return acc;
      }, {} as Dict<string>),
    );
  }
}
