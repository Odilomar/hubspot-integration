import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCaseService } from '../use-cases';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto, GetContactsDto } from '../dtos';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getContactsUseCaseService: GetContactsUseCaseService,
    private readonly createContactUseCase: CreateContactUseCase,
  ) {}

  @Get('/')
  getContacts(@Query() query: GetContactsDto) {
    return this.getContactsUseCaseService.execute(query);
  }

  @Post('/')
  createContact(@Body() body: CreateContactDto) {
    return this.createContactUseCase.execute(body);
  }
}
