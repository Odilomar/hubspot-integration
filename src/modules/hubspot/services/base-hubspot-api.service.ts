import { Injectable } from '@nestjs/common';
import { Client as HubspotApiClient } from '@hubspot/api-client';
import configuration from '../../../config/configuration';

@Injectable()
export class BaseHubspotApiService {
  hubspotApiClient: HubspotApiClient;

  constructor() {
    this.hubspotApiClient = new HubspotApiClient({
      accessToken: configuration().hubspot.accessToken,
    });
  }
}
