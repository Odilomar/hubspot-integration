import { Module } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from './use-cases';
import { HubspotModule } from '../hubspot/hubspot.module';
import { ContactsController } from './controllers';
import { CreateContactsInBatchUseCase } from './use-cases/create-contacts-in-batch.use-case';
import { GoogleModule } from '../google/google.module';

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
