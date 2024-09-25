import { Module } from '@nestjs/common';
import { GetContactsUseCaseService } from './use-cases';
import { HubspotModule } from '../hubspot/hubspot.module';
import { ContactsController } from './controllers';

@Module({
  imports: [HubspotModule],
  providers: [GetContactsUseCaseService],
  controllers: [ContactsController],
})
export class ContactsModule {}
