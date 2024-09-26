import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from '../use-cases';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateContactDto, GetContactsDto } from '../dtos';
import { CreateContactsInBatchUseCase } from '../use-cases/create-contacts-in-batch.use-case';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getContactsUseCase: GetContactsUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly createContactsInBatchUseCase: CreateContactsInBatchUseCase,
  ) {}

  @Get('/')
  getContacts(@Query() query: GetContactsDto) {
    return this.getContactsUseCase.execute(query);
  }

  @Post('/')
  createContact(@Body() body: CreateContactDto) {
    return this.createContactUseCase.execute(body);
  }

  @Post('/batch')
  @ApiBody({ type: [CreateContactDto] })
  createContactsInBatch(@Body() body: CreateContactDto[]) {
    return this.createContactsInBatchUseCase.execute(body);
  }
}
