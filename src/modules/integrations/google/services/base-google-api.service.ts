import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class BaseGoogleApiService {
  protected async authorize() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return auth.getClient();
  }
}
