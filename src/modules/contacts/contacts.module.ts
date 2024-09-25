import { Module } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from './use-cases';
import { HubspotModule } from '../hubspot/hubspot.module';
import { ContactsController } from './controllers';

@Module({
  imports: [HubspotModule],
  providers: [GetContactsUseCase, CreateContactUseCase],
  controllers: [ContactsController],
})
export class ContactsModule {}
