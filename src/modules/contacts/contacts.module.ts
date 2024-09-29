import { Module } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from './use-cases';
import { HubspotModule } from '../integrations/hubspot/hubspot.module';
import { GoogleModule } from '../integrations/google/google.module';
import { ContactsController } from './controllers';
import { CreateContactsInBatchUseCase } from './use-cases/create-contacts-in-batch.use-case';

@Module({
  imports: [HubspotModule, GoogleModule],
  providers: [
    GetContactsUseCase,
    CreateContactUseCase,
    CreateContactsInBatchUseCase,
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
