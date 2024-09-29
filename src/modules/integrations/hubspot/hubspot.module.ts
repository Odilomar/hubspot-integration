import { Module } from '@nestjs/common';
import { BaseHubspotApiService, ContactsHubspotApiService } from './services';

@Module({
  providers: [BaseHubspotApiService, ContactsHubspotApiService],
  exports: [ContactsHubspotApiService],
})
export class HubspotModule {}
