import { Module } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from './use-cases';
import { HubspotModule } from '../integrations/hubspot/hubspot.module';
import { GoogleModule } from '../integrations/google/google.module';
import { ContactsController } from './controllers';
import { CreateContactsInBatchUseCase } from './use-cases/create-contacts-in-batch.use-case';
import { CreateContactsInBatchBySpreadsheetIdUseCase } from './use-cases/create-contacts-in-batch-by-spreadsheet-id.use-case';

@Module({
  imports: [HubspotModule, GoogleModule],
  providers: [
    GetContactsUseCase,
    CreateContactUseCase,
    CreateContactsInBatchUseCase,
    CreateContactsInBatchBySpreadsheetIdUseCase,
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
