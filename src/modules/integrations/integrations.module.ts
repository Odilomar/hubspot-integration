import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { HubspotModule } from './hubspot/hubspot.module';

@Module({
  imports: [HubspotModule, GoogleModule],
})
export class IntegrationsModule {}
