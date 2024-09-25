import { Controller, Get, Query } from '@nestjs/common';
import { GetContactsUseCaseService } from '../use-cases';
import { ApiTags } from '@nestjs/swagger';
import { GetContactsDto } from '../dtos';

@ApiTags('Contacts')
@Controller('Contacts')
export class ContactsController {
  constructor(
    private readonly getContactsUseCaseService: GetContactsUseCaseService,
  ) {}

  @Get('/')
  getContacts(@Query() query: GetContactsDto) {
    return this.getContactsUseCaseService.execute(query);
  }
}
