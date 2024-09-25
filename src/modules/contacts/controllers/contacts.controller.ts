import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from '../use-cases';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto, GetContactsDto } from '../dtos';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly GetContactsUseCase: GetContactsUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
  ) {}

  @Get('/')
  getContacts(@Query() query: GetContactsDto) {
    return this.GetContactsUseCase.execute(query);
  }

  @Post('/')
  createContact(@Body() body: CreateContactDto) {
    return this.createContactUseCase.execute(body);
  }
}
