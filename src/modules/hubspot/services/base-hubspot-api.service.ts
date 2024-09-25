import { Injectable } from '@nestjs/common';
import { Client as HubspotApiClient } from '@hubspot/api-client';

@Injectable()
export class BaseHubspotApiService {
  hubspotApiClient: HubspotApiClient;

  constructor() {
    this.hubspotApiClient = new HubspotApiClient({ apiKey: '' });
  }
}
