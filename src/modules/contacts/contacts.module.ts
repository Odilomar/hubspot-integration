import { Module } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCaseService } from './use-cases';
import { HubspotModule } from '../hubspot/hubspot.module';
import { ContactsController } from './controllers';

@Module({
  imports: [HubspotModule],
  providers: [GetContactsUseCaseService, CreateContactUseCase],
  controllers: [ContactsController],
})
export class ContactsModule {}
