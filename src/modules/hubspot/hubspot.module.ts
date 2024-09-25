import { Module } from '@nestjs/common';
import { HubspotServiceService } from './hubspot.service/hubspot.service.service';

@Module({
  providers: [HubspotServiceService]
})
export class HubspotModule {}
