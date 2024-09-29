import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateContactUseCase, GetContactsUseCase } from '../use-cases';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateContactDto, GetContactsDto } from '../dtos';
import { CreateContactsInBatchUseCase } from '../use-cases/create-contacts-in-batch.use-case';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleSheetsApiService } from '../../integrations/google/services';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getContactsUseCase: GetContactsUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly createContactsInBatchUseCase: CreateContactsInBatchUseCase,
    private readonly googleSheetsApiService: GoogleSheetsApiService,
  ) {}

  @Get('/:id')
  getContactsById(@Param('id') id: string) {
    return this.googleSheetsApiService.getSpreadsheetValuesById(id);
  }

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

  @Post('/batch/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadGoogleSheet(@UploadedFile() file: Express.Multer.File) {
    // Implement the logic to handle the uploaded file
    // return this.handleGoogleSheetUpload(file);

    console.log({ file });
  }
}
