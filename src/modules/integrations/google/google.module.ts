import { Module } from '@nestjs/common';
import { BaseGoogleApiService, GoogleSheetsApiService } from './services';

@Module({
  providers: [BaseGoogleApiService, GoogleSheetsApiService],
  exports: [GoogleSheetsApiService],
})
export class GoogleModule {}
