import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from '../use-cases';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateContactDto, GetContactsDto } from '../dtos';
import { CreateContactsInBatchUseCase } from '../use-cases/create-contacts-in-batch.use-case';
import { CreateContactsInBatchBySpreadsheetIdUseCase } from '../use-cases/create-contacts-in-batch-by-spreadsheet-id.use-case';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getContactsUseCase: GetContactsUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly createContactsInBatchUseCase: CreateContactsInBatchUseCase,
    private readonly createContactsInBatchBySpreadsheetIdUseCase: CreateContactsInBatchBySpreadsheetIdUseCase,
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

  @Post('/batch/:spreadsheetId')
  createContactsInBatchBySpreadsheetId(
    @Param('spreadsheetId') spreadsheetId: string,
  ) {
    return this.createContactsInBatchBySpreadsheetIdUseCase.execute(
      spreadsheetId,
    );
  }
}
