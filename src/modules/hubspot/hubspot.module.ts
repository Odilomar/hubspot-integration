import { Module } from '@nestjs/common';
import { BaseHubspotApiService, ContactsApiServiceService } from './services';

@Module({
  providers: [BaseHubspotApiService, ContactsApiServiceService],
  exports: [ContactsApiServiceService],
})
export class HubspotModule {}
